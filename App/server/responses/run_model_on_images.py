import os
import json
from model import ModelsWrapper  # Assuming ModelsWrapper is in a separate file
import platform

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


    models_wrapper = ModelsWrapper()

    for place_id_folder in os.listdir(root_folder):
        folder_path = os.path.join(root_folder, place_id_folder)
        if os.path.isdir(folder_path):
            json_path = os.path.join(folder_path, 'place_data.json')
            if os.path.exists(json_path):
                with open(json_path, 'r') as f:
                    image_data = json.load(f)
                
                for image_info in image_data:
                    image_path = os.path.join(root_folder, image_info['local_path'])
                    if os.path.exists(image_path):
                        pred = models_wrapper.predict_with_detect(image_path, classifications_to_predict)
                        image_info['prediction'] = pred
                        
                with open(json_path, 'w') as f:
                    json.dump(image_data, f, indent=4)

if __name__ == "__main__":
    root_folder = "responses/images"
    run_model_on_images(root_folder, json_file_path)
