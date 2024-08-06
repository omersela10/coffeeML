import os
import json
import requests

# Set your Imgur client ID and client secret
IMGUR_CLIENT_ID = '65cca06c1dc8e0d'
IMGUR_CLIENT_SECRET = '4224cf8bdc1949284286e015e41c407d31713eb3'

# Function to upload an image to Imgur
def upload_image_to_imgur(image_path):
    headers = {"Authorization": f"Client-ID {IMGUR_CLIENT_ID}"}
    with open(image_path, 'rb') as image_file:
        response = requests.post(
            "https://api.imgur.com/3/image",
            headers=headers,
            files={"image": image_file},
            data={"type": "file"}
        )
    response_data = response.json()
    if response_data['success']:
        return response_data['data']['link']
    else:
        raise Exception(f"Failed to upload image to Imgur: {response_data['data']['error']}")

# Path to the directories
base_path = r'C:\git\coffee_ml\coffeeML\App\server\responses\images'
base_path_2 = r'C:\git\coffee_ml\coffeeML\App\server\responses'

# Iterate through each folder
for folder in os.listdir(base_path):
    folder_path = os.path.join(base_path, folder)
    print(f"Processing folder: {folder}")
    if os.path.isdir(folder_path):
        json_file_path = os.path.join(folder_path, 'place_data.json')
        
        # Read the JSON file
        with open(json_file_path, 'r') as json_file:
            data = json.load(json_file)
        
        # Iterate through each item in the JSON file
        for item in data:
            old_image_url = item['image_url']
            local_path = os.path.join(base_path_2, item['local_path'].replace('/', os.sep))
            print(f"Attempting to upload file: {local_path}")
            
            # Check if the file exists before uploading
            if not os.path.isfile(local_path):
                print(f"File not found: {local_path}")
                continue
            
            # Upload the image to Imgur
            try:
                new_image_url = upload_image_to_imgur(local_path)
            except Exception as e:
                print(f"Failed to upload {local_path} to Imgur: {e}")
                continue
            
            # Update the URLs in the JSON data
            item['old_image_url'] = old_image_url
            item['image_url'] = new_image_url
        
        # Write the updated JSON data back to the file
        with open(json_file_path, 'w') as json_file:
            json.dump(data, json_file, indent=4)

        print(f"Updated URLs in {json_file_path}")

# Debugging output to check paths
for folder in os.listdir(base_path):
    folder_path = os.path.join(base_path, folder)
    print(f"Checking folder: {folder_path}")
    if os.path.isdir(folder_path):
        json_file_path = os.path.join(folder_path, 'place_data.json')
        print(f"JSON file path: {json_file_path}")
        
        # Read the JSON file
        with open(json_file_path, 'r') as json_file:
            data = json.load(json_file)
        
        # Iterate through each item in the JSON file
        for item in data:
            print(f"Original path: {item['local_path']}")
            local_path = os.path.join(base_path_2, item['local_path'].replace('/', os.sep))
            print(f"Constructed local path: {local_path}")
            
            # Check if the file exists
            if not os.path.isfile(local_path):
                print(f"File does not exist: {local_path}")
            else:
                print(f"File exists: {local_path}")
