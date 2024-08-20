from flask import Blueprint, request, jsonify
import os
import requests
import json 
from flask import send_file
from flask_cors import cross_origin
from helpers.coffee_helpers import coffee_quality
import time
location_bp = Blueprint('location_bp', __name__)




@location_bp.route("/download_image", methods=["GET"])
@cross_origin()
def download_image():
    image_path = request.args.get("image_path")
    if not image_path or not os.path.exists(image_path):
        return jsonify({"error": "Invalid image path"}), 400
    return send_file(image_path, mimetype="image/jpeg")

@location_bp.route("/get_locations", methods=["GET"])
@cross_origin()
def get_locations():
    responses_folder = os.path.join(os.getcwd(), "responses")
    if os.path.exists(responses_folder) and os.path.isdir(responses_folder):
        json_files = [f.replace("get_coffee_shops_", "").replace(".json", "") for f in os.listdir(responses_folder) if f.endswith(".json")]
        return jsonify(json_files)
    else:
        return jsonify({"error": "responses folder not found"}), 404
    

@location_bp.route("/get_location_results", methods=["POST"])
@cross_origin()
def get_location_results():
    time.sleep(1)
    request_data = request.get_json()
    location = request_data.get("location")
    user_choices = request_data.get("userChoices")
    print(user_choices)
    if not location:
        return jsonify({"error": "Location parameter is required"}), 400

    json_file_path = os.path.join("responses", f"get_coffee_shops_{location}.json")
    coffee_shops = json.load(open(json_file_path))
    if not os.path.exists(json_file_path):
        return jsonify({"error": "Invalid location"}), 400
    for place in coffee_shops:
        place_id = place["place_id"]
        is_matched = False
        max_quality = 0
        images = []
        place_data_json = os.path.join("responses", "images", place_id, f"place_data.json")
        with open(place_data_json, "r") as json_file:
            for image in json.load(json_file):
                if image["prediction"].get("Object_not_detected", False):
                    continue
                else: # if image is detected:
                    is_matched_image = True
                    quality_image = 0
                    keys = user_choices.keys()
                    for key in keys:
                        if str(image["prediction"][key]).lower() != str(user_choices[key]).lower():
                            is_matched_image = False
                            break
                    if is_matched_image:
                        is_matched = True

                    quality_image = coffee_quality(image["prediction"])
                    if quality_image > max_quality:
                        max_quality = quality_image

                    image_content = { "is_matched": is_matched_image, "quality": quality_image, "url": image["image_url"]}
                    images.append(image_content)
                    

        place["is_matched"] = is_matched
        place["quality"] = max_quality
        place["images"] = images
    return jsonify(coffee_shops)


# ---------------------------------  Helper functions  to get real and fake data -----------------------------------
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

