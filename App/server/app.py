from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import time
from model import ModelsWrapper

json_file_path = "resources\MLmodels\classifications_conf.json"

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app)  # You can keep this for global settings

@app.route('/')
def hello():
    return 'Hello, World!'

@app.route('/upload', methods=['POST'])
@cross_origin()  # Explicitly set CORS for this route
def upload_file():
    if 'file' not in request.files:
        return jsonify(message="No file part"), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify(message="No selected file"), 400
    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        
        # Simulate a delay
        time.sleep(3)
        
        # Perform predictions
        classifications_to_predict = [
            "coffe_type",
            "crema", 
            "served_way",
            "type_of_cup",
        ]
        models_wrapper = ModelsWrapper(json_file_path)
        predictions_with_detect = models_wrapper.predict_with_detect(filename, classifications_to_predict)
        
        return jsonify(predictions_with_detect), 200

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
