from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os
import json
import platform
import requests
from flask import send_file

config_json = json.load(open("config.json"))
GOOGLE_API_KEY = config_json["GOOGLE_API_KEY"]

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
app.config["JSON_FILE_PATH"] = json_file_path  # Set json_file_path in app config

CORS(app)  # You can keep this for global settings

@app.route("/")
def hello():
    return "Hello, World!"

# Import and register blueprints
from routes.coffee_route import coffee_bp
from routes.location_route import location_bp

app.register_blueprint(coffee_bp)
app.register_blueprint(location_bp)

if __name__ == "__main__":
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    app.run(debug=True)
