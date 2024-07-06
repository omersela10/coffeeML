from flask import Blueprint, request, jsonify
import os
import requests
import json 
from flask import send_file
from flask_cors import cross_origin

location_bp = Blueprint('location_bp', __name__)

@location_bp.route("/get_coffee_shops_by_location", methods=["GET"])
@cross_origin()
def get_coffee_shops_by_location():
    city = request.args.get("city")
    # return get_real_coffee_shops_by_location(city)
    return get_fake_coffee_shops_by_location(city)

@location_bp.route("/get_images_by_place_id", methods=["GET"])
@cross_origin()
def get_images_by_place_id():
    place_id = request.args.get("place_id")
    # return get_real_images_by_place_id(place_id)
    return get_fake_images_by_place_id(place_id)

@location_bp.route("/download_image", methods=["GET"])
@cross_origin()
def download_image():
    image_path = request.args.get("image_path")
    if not image_path or not os.path.exists(image_path):
        return jsonify({"error": "Invalid image path"}), 400
    return send_file(image_path, mimetype="image/jpeg")

def get_real_coffee_shops_by_location(city):
    config_json = json.load(open("config.json"))
    GOOGLE_API_KEY = config_json["GOOGLE_API_KEY"]
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    geocode_url = f"https://maps.googleapis.com/maps/api/geocode/json?address={city}&key={GOOGLE_API_KEY}"
    geocode_response = requests.get(geocode_url).json()

    if geocode_response["status"] != "OK":
        return jsonify({"error": "Error fetching geocode information"}), 400

    location = geocode_response["results"][0]["geometry"]["location"]
    lat, lng = location["lat"], "lng"

    places_url = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={lat},{lng}&radius=1500&type=cafe&key={GOOGLE_API_KEY}"
    places_response = requests.get(places_url).json()

    if places_response["status"] != "OK":
        return jsonify({"error": "Error fetching places information"}), 400

    coffee_shops = places_response.get("results", [])
    return jsonify(coffee_shops)

def get_fake_coffee_shops_by_location(city):
    print(os.getcwd())
    if city == "tel aviv":
        json_file_path = os.path.join("responses", "get_coffee_shops_tel_aviv.json")
    elif city == "netanya":
        json_file_path = os.path.join("responses", "get_coffee_shops_netanya.json")
    else:
        return jsonify({"error": "Invalid city"}), 400
    return json.load(open(json_file_path))

def get_real_images_by_place_id(place_id):
    config_json = json.load(open("config.json"))
    GOOGLE_API_KEY = config_json["GOOGLE_API_KEY"]
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

    image_data = []

    # Ensure the directory for the place_id exists
    place_dir = os.path.join("images", place_id)
    if not os.path.exists(place_dir):
        os.makedirs(place_dir)

    for photo in photos:
        photo_reference = photo["photo_reference"]
        photo_url = f"https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference={photo_reference}&key={GOOGLE_API_KEY}"
        image_response = requests.get(photo_url)

        if image_response.status_code == 200:
            image_path = os.path.join(place_dir, f"{photo_reference}.jpg")
            with open(image_path, "wb") as img_file:
                img_file.write(image_response.content)
            image_data.append({
                "image_url": photo_url,
                "local_path": image_path
            })

    # Save the image data (URLs and local paths) to a JSON file
    json_file_path = os.path.join(place_dir, f"{place_id}.json")
    with open(json_file_path, "w") as json_file:
        json.dump(image_data, json_file)

    return jsonify(image_data)



def get_fake_images_by_place_id(place_id):
    if not place_id:
        return jsonify({"error": "Place ID parameter is required"}), 400

    json_file_path = os.path.join("responses", "images", place_id + f"/{place_id}.json")
    print(json_file_path)
    if not os.path.exists(json_file_path):
        return jsonify({"error": "No images available for this place"}), 400

    return json.load(open(json_file_path))