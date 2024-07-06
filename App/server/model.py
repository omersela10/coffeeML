from PIL import Image
from ultralytics import YOLO 
import json
import os

class ClassificationModel:
    def __init__(self, model_path, class_labels):
        """
        Initialize the model with the given path and class labels.
        
        Args:
        model_path (str): Path to the trained model file.
        class_labels (list): A list of class labels.
        """
        self.model_path = model_path
        self.class_labels = class_labels
        try:
            self.model = YOLO(self.model_path)
        except Exception as e:
            print(f"Failed to load model from {model_path}: {e}")   


    def load_model(self):
        """
        Load the model from the given path.
        """
        self.model = YOLO(self.model_path)


    def predict(self, image_path):
        """
        Predict the class of an image.
        
        Args:
        image_path (str): Path to the image file.
        
        Returns:
        str: The predicted class label or 'Unknown' if prediction fails.
        """
        try:
            # Perform prediction
            results = self.model.predict(image_path, show=False)
            
            # Extract the predicted class with the highest confidence
            if len(results) > 0 and len(results[0].boxes) > 0:
                predicted_class_id = int(results[0].boxes[0].cls)
                return self.class_labels[predicted_class_id]
            else:
                return "Unknown"  # Return Unknown if no prediction is made
            
        except Exception as e:
            print(f"An error occurred while predicting on {image_path}: {e}")
            return "Error"



class ObjectDetectionModel:
    def __init__(self, model_path):
        """
        Initialize the model with the given path and class labels.
        
        Args:
        model_path (str): Path to the trained model file.
        class_labels (list): A list of class labels.
        """
        self.model_path = model_path
        try:
            self.model = YOLO(self.model_path)
        except Exception as e:
            print(f"Failed to load model from {model_path}: {e}")   


    def load_model(self):
        """
        Load the model from the given path.
        """
        self.model = YOLO(self.model_path)


    def predict(self, image_path):
        """
        Predict the class of an image.
        
        Args:
        image_path (str): Path to the image file.
        
        Returns:
        str: The predicted class label or 'Unknown' if prediction fails.
        """
        try:
            # Perform prediction
            results = self.model.predict(image_path)
            if len(results) > 0 and len(results[0].boxes) > 0:
                return True
            else:
                return False
            
        except Exception as e:
            print(f"An error occurred while predicting on {image_path}: {e}")
            return False
        


class ModelsWrapper:
    def __init__(self, json_file_path):
        self.classifications = {}
        self.object_detection = None
        self.load_models(json_file_path)

    def load_models(self, json_file_path):
        with open(json_file_path, 'r') as file:
            data = json.load(file)
        
        # Load classification models
        for classification in data["clasifications"]:
            model_path = classification["model_path"]
            class_labels = classification["class_labels"]
            classification_name = classification["classification_name"]
            self.classifications[classification_name] = ClassificationModel(model_path, class_labels)

        # Load object detection model
        if "coffee_detection" in data:
            detection_model_path = data["coffee_detection"]["model_path"]
            self.object_detection = ObjectDetectionModel(detection_model_path)
        else:
            print("omer  No object detection model found in the JSON file")

    def predict_without_detect(self, image_path, classifications):
        """
        Perform predictions for specified classifications without object detection.

        Args:
        image_path (str): Path to the image file.
        classifications (list): list of strings with classification names.
                                example: {"coffe_type", "crema", "served_way", "type_of_cup"}
        Returns:
        dict: Dictionary with classification names as keys and predictions as values or error messages.
        """
        predictions = {}
        for classification_name in classifications:
            if classification_name in self.classifications:
                model = self.classifications[classification_name]
                try:
                    # Use the specific confidence threshold for this prediction
                    prediction = model.predict(image_path)
                except Exception as e:
                    prediction = f"An error occurred: {e}"
                predictions[classification_name] = prediction
            else:
                predictions[classification_name] = "Classification not found"
        return predictions
    
    def predict_with_detect(self, image_path, classifications):
        """
        Perform predictions for specified classifications with object detection.

        Args:
        image_path (str): Path to the image file.
        classifications (dict): Dictionary with classification names as keys and confidence thresholds as values.
                                esamplle: {"coffe_type": 0.5, "crema": 0.5, "served_way": 0.5, "type_of_cup": 0.5}

        Returns:
        dict: Dictionary with classification names as keys and predictions as values.
        """
        predictions = {}
        if self.object_detection is not None:
            try:
                object_detected = self.detection(image_path)
            except Exception as e:
                object_detected = False
                print(f"An error occurred: {e}")
            # If object is detected, perform predictions
            if object_detected:
                return self.predict_without_detect(image_path, classifications)
            else:
                return {"Object_not_detected": "No predictions"}


    def detection(self, image_path):
        """
        Perform object detection on the image.

        Args:
        image_path (str): Path to the image file.

        Returns:
        bool: True if an object is detected, False otherwise.
        """
        if self.object_detection is not None:
            try:
                object_detected = self.object_detection.predict(image_path)
            except Exception as e:
                object_detected = False
                print(f"An error occurred: {e}")
            return object_detected
        else:
            return False
        



# main code:
# json_file_path = "resources\MLmodels\classifications_conf.json"
# models_wrapper = ModelsWrapper(json_file_path)
# image_paths = [
#                 r"C:\\git\\coffee_ml\\coffeeML\\Coffee_photos\\augmented_images_folder\\coffe_image(8).jpg",
#                 r"C:\\git\\coffee_ml\\coffeeML\\Coffee_photos\\augmented_images_folder\\coffe_image(10).jpg",
#                 r"C:\\git\\coffee_ml\\coffeeML\\Coffee_photos\\augmented_images_folder\\coffe_image(4)_augmented_1.jpg",
#                 r"C:\\git\\coffee_ml\\coffeeML\\Coffee_photos\\augmented_images_folder\\coffe_image(28)_augmented_11.jpg",
#                 r"C:\\Users\\omers\\OneDrive\\Desktop\\coffe1111.png",
#                 r"C:\\Users\\omers\\OneDrive\\Desktop\\coffee6.png",
#                 r"C:\\Users\\omers\\OneDrive\\Desktop\\coffee7.png",
#                 r"C:\\Users\omers\\OneDrive\\Desktop\\food1.png" 
#                ]
# classifications_to_predict = [
#     "coffe_type",
#     "crema", 
#     "served_way",
#     "type_of_cup",
#     "sdfdsf"
# ]

# results = {}
# for image_path in image_paths:
#     print(f"Performing predictions on image: {image_path}")
#     predictions = models_wrapper.predict_with_detect(image_path, classifications_to_predict)
#     results[image_path] = predictions

# print("Results:")
# for image_path, predictions in results.items():
#     print("="*50)
#     print(f"Image: {image_path}")
#     print(predictions)
#     print("="*50)
#     print("")
