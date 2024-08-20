from flask import Blueprint, request, jsonify, current_app
import os
import json
from model import ModelsWrapper
from helpers.coffee_helpers import coffee_match_user_choices, coffee_quality
from flask_cors import cross_origin
coffee_bp = Blueprint('coffee_bp', __name__)

@coffee_bp.route("/upload", methods=["POST"])
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
            filename = os.path.join(current_app.config["UPLOAD_FOLDER"], file.filename)
            file.save(filename)
            files.append(filename)

    # Perform predictions
    classifications_to_predict = [
        "coffee_type",
        "crema",
        "served_way",
        "type_of_cup",
    ]

    models_wrapper = ModelsWrapper(current_app.config["JSON_FILE_PATH"])
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
