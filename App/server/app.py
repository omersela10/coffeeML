from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import time

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
        time.sleep(3)  # Simulate a delay
        return jsonify(message="File uploaded successfully"), 200

if __name__ == '__main__':
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
