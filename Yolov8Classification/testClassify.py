import os
import glob
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
from ultralytics import YOLO  # Assuming the YOLO library is correctly installed

# Paths to your dataset and model
images_folder = r"C:\Users\USER\git\coffeeML\YOLOV8Classification\coffeeImagesSamples"

model_path = r"C:\Users\USER\git\coffeeML\YOLOV8Classification\finetune_run6\weights\best.pt"

# Load the model
model = YOLO(model_path)
results = model.predict(images_folder, conf=0.5)
# Display the results
results[0].show()