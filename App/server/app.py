from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import time
import json
from model import ModelsWrapper
import platform
from helpers.coffee_helpers import coffee_match_user_choices, coffee_quality
import requests
from flask import send_file

config_json = json.load(open("config.json"))
GOOGLE_API_KEY = config_json["GOOGLE_API_KEY"]


if platform.system() == "Windows":
    json_file_path = os.path.join(
        "resources", "MLmodels", "classifications_conf_win.json"
    )
else:
    json_file_path = os.path.join(
        "resources", "MLmodels", "classifications_conf_linux.json"
    )

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

CORS(app)  # You can keep this for global settings


@app.route("/")
def hello():
    return "Hello, World!"


@app.route("/upload", methods=["POST"])
@cross_origin()
def upload_file():
    user_choices_str = request.form.get("user_choices")
    user_choices = json.loads(user_choices_str)  # Parse JSON string into dictionary
    print(user_choices)

    if "file0" not in request.files:
        return jsonify(message="No files part"), 400

    files = []
    for key in request.files:
        file = request.files[key]
        if file.filename == "":
            return jsonify(message="No selected file"), 400
        if file:
            filename = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
            file.save(filename)
            files.append(filename)

    # Perform predictions
    classifications_to_predict = [
        "coffee_type",
        "crema",
        "served_way",
        "type_of_cup",
    ]

    models_wrapper = ModelsWrapper(json_file_path)
    predictions = {}
    matches = []
    num_of_coffee_images = 0
    for file in files:
        pred = models_wrapper.predict_with_detect(file, classifications_to_predict)
        predictions[file] = pred
        if "Object_not_detected" not in pred.keys():
            num_of_coffee_images += 1
            if coffee_match_user_choices(pred, user_choices):
                matches.append({"file": file, "quality": coffee_quality(pred)})

    return {
        "status": "success",
        "predictions": predictions,
        "num_of_coffee_images": num_of_coffee_images,
        "matches": matches,
    }


# ------------------------------- GOOGLE MAPS API -------------------------------
@app.route("/get_coffee_shops", methods=["GET"])
def get_coffee_shops():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={city}&key={GOOGLE_API_KEY}"
    geocode_response = requests.get(geocode_url).json()

    if geocode_response["status"] != "OK":
        return jsonify({"error": "Error fetching geocode information"}), 400

    location = geocode_response["results"][0]["geometry"]["location"]
    lat, lng = location["lat"], location["lng"]

    places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=1500&type=cafe&key={GOOGLE_API_KEY}"
    places_response = requests.get(places_url).json()

    if places_response["status"] != "OK":
        return jsonify({"error": "Error fetching places information"}), 400

    coffee_shops = places_response.get("results", [])
    return jsonify(coffee_shops)


@app.route("/get_images", methods=["GET"])
def get_images():
    place_id = request.args.get("place_id")
    if not place_id:
        return jsonify({"error": "Place ID parameter is required"}), 400

    details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={GOOGLE_API_KEY}"
    details_response = requests.get(details_url).json()

    if details_response["status"] != "OK":
        return jsonify({"error": "Error fetching place details"}), 400

    place_details = details_response.get("result", {})
    photos = place_details.get("photos", [])

    if not photos:
        return jsonify({"error": "No photos available for this place"}), 400

    images = []
    for photo in photos:
        photo_reference = photo["photo_reference"]
        photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={GOOGLE_API_KEY}"
        image_response = requests.get(photo_url)

        if image_response.status_code == 200:
            image_path = os.path.join("images",place_id, f"{photo_reference}.jpg")
            if not os.path.exists("images"):
                os.makedirs("images")
            if not os.path.exists(os.path.join("images",place_id)):    
                os.makedirs(os.path.join("images",place_id))
            with open(image_path, "wb") as img_file:
                img_file.write(image_response.content)
            images.append(image_path)

    return jsonify({"images": images})


@app.route("/download_image", methods=["GET"])
def download_image():
    image_path = request.args.get("image_path")
    if not image_path or not os.path.exists(image_path):
        return jsonify({"error": "Invalid image path"}), 400
    return send_file(image_path, mimetype="image/jpeg")


if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
