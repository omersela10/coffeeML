
import os
import json

coffee_shops_json_path = "get_coffee_shops_netanya.json"
def get_coffee_shops_tel_aviv():
    print(coffee_shops_json_path)
    if not os.path.exists(coffee_shops_json_path):
        return []
    with open(coffee_shops_json_path, "r") as file:
        coffee_shops = json.load(file)
        for coffee_shop in coffee_shops:
            print(coffee_shop["place_id"])
            images = get_real_images_by_place_id(coffee_shop["place_id"])
            coffee_shop["images"] = images
    return coffee_shops


GOOGLE_API_KEY= "AIzaSyDWrZOAoDBUSKdJzGkZcC9ydKcEseHha3s"


def get_real_images_by_place_id(place_id):
    if not place_id:
        print("Place ID parameter is required")
        return

    details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={GOOGLE_API_KEY}"
    details_response = requests.get(details_url).json()

    if details_response["status"] != "OK":
        print("Error fetching place details")
        return

    place_details = details_response.get("result", {})
    photos = place_details.get("photos", [])

    if not photos:
        print("No photos available for this place")
        return

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

    return image_data


import requests
def get_images(place_id):
    details_url = f"https://maps.googleapis.com/maps/api/place/details/json?place_id={place_id}&key={GOOGLE_API_KEY}"
    details_response = requests.get(details_url).json() 

    if details_response["status"] != "OK":
        print("Error fetching place details")

    place_details = details_response.get("result", {})
    photos = place_details.get("photos", [])

    if not photos:
        print("No photos available for this place")
        # remove the item from the json file and return
        with open(coffee_shops_json_path, "r") as file:
            coffee_shops = json.load(file)
        coffee_shops = [shop for shop in coffee_shops if shop["place_id"] != place_id]
        with open(coffee_shops_json_path, "w") as file:
            json.dump(coffee_shops, file, indent=2)
        return []

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

    return images





if __name__ == "__main__":
    get_coffee_shops_tel_aviv()