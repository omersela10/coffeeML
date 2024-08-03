from flask import Flask, jsonify
import os

app = Flask(__name__)

@app.route('/')
def get_locations():
    # Define the path to the responses folder
    base_dir = os.path.dirname(os.path.abspath(__file__))
    responses_folder = os.path.join( 'App', 'server', 'responses')
    print(responses_folder)
    
    # List all JSON files in the responses folder
    if os.path.exists(responses_folder) and os.path.isdir(responses_folder):
        json_files = [f.replace("get_coffee_shops_", "").replace(".json", "") for f in os.listdir(responses_folder) if f.endswith(".json")]
        return jsonify(json_files)
    else:
        return jsonify({"error": "responses folder not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
