import os
import json
from model import ModelsWrapper  # Assuming ModelsWrapper is in a separate file
import platform

# Determine the JSON file path based on the operating system
json_file_path = ""
if platform.system() == "Windows":
    json_file_path = os.path.join(
        "resources", "MLmodels", "classifications_conf_win.json"
    )
else:
    json_file_path = os.path.join(
        "resources", "MLmodels", "classifications_conf_linux.json"
    )

def run_model_on_images(root_folder, json_file_path):
    classifications_to_predict = [
        "coffee_type",
        "crema",
        "served_way",
        "type_of_cup",
    ]
    models_wrapper = ModelsWrapper(json_file_path)
    
    # Iterate over each place ID folder in the root directory
    for place_id_folder in os.listdir(root_folder):
        print(f"Processing place {place_id_folder}")
        folder_path = os.path.join(root_folder, place_id_folder)
        print(folder_path)
        place_id_json = os.path.join(folder_path, place_id_folder + ".json")
        
        if os.path.isdir(folder_path):
            json_path = os.path.join(folder_path, 'place_data.json')
            
            # Load the existing JSON data if it exists
            if os.path.exists(json_path):
                with open(json_path, 'r') as f:
                    print(f"Processing {json_path}")
                    image_data = json.load(f)
            else:
                image_data = []

            # Load the place ID JSON data
            place_data = []
            if os.path.exists(place_id_json):
                with open(place_id_json, 'r') as f:
                    place_data = json.load(f)
            
            # Process each .jpg file in the folder
            for filename in os.listdir(folder_path):
                if filename.lower().endswith('.jpg'):
                    image_path = os.path.join(folder_path, filename)
                    pred = models_wrapper.predict_with_detect(image_path, classifications_to_predict)
                    image_info = next((item for item in image_data if item['local_path'] == os.path.join('images', place_id_folder, filename)), None)
                    
                    # Find the image URL from the place data
                    image_url = ""
                    for place in place_data:
                        if place['local_path'] == os.path.join('images', place_id_folder, filename):
                            image_url = place['image_url']
                            break
                    
                    if image_info is None:
                        image_info = {
                            'image_url': image_url,
                            'local_path': os.path.join('images', place_id_folder, filename),
                            'prediction': pred
                        }
                        image_data.append(image_info)
                    else:
                        image_info['image_url'] = image_url
                        image_info['prediction'] = pred

            # Save the updated JSON data
            with open(json_path, 'w') as f:
                json.dump(image_data, f, indent=4)

if __name__ == "__main__":
    root_folder = "responses/images"
    run_model_on_images(root_folder, json_file_path)
