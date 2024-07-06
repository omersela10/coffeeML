from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import time
import json
from model import ModelsWrapper
import platform

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
        pred = models_wrapper.predict_with_detect(
            file, classifications_to_predict
        )
        predictions[file] = pred
        if 'Object_not_detected' not in pred.keys():
            num_of_coffee_images += 1
            if coffee_match_user_choices(pred, user_choices):
                matches.append({"file": file, "quality": coffee_quality(pred)})

    return {"status": "success", "predictions": predictions, "num_of_coffee_images": num_of_coffee_images, "matches": matches}

def coffee_match_user_choices(predict, user_choices):
    coffee_type = user_choices["coffee_type"] 
    type_of_cup = str(user_choices["type_of_cup"]).lower()
    is_match = True
    if coffee_type != predict["coffee_type"]:
        is_match = False
    if type_of_cup != predict["type_of_cup"]:
        is_match = False
    return is_match

def coffee_quality(predict):
    coffee_type = predict["coffee_type"]
    crema = predict["crema"]
    served_way = predict["served_way"]
    quality = 0

    if coffee_type == "black":
        if served_way =="true":
            quality = 3
        else:
            quality = 1
    elif coffee_type == "cappuccino":
        if crema == "true":
            quality = quality + 2
        if served_way == "true":
            quality = quality + 1
        if quality == 0:
            quality = 1
    elif coffee_type == "espresso":
        if crema == "true":
            quality = quality + 2
        if served_way == "true":
            quality = quality + 1
        if quality == 0:
            quality = 1

    return quality


if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
