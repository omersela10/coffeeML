# Ignore warnings in ipynb
import warnings
warnings.filterwarnings('ignore')
import os
import supervision as sv
import numpy as np
import torch
import random
import cv2
from groundingdino.util.inference import load_model, load_image, predict, annotate

def load_groundingdino():
    HOME=os.getcwd()

    WEIGHTS_NAME = "groundingdino_swint_ogc.pth"
    WEIGHTS_PATH = os.path.join(HOME, "weights", WEIGHTS_NAME)
    print(WEIGHTS_PATH, "; exist:", os.path.isfile(WEIGHTS_PATH))

    CONFIG_PATH = os.path.join(HOME, "groundingdino\config\GroundingDINO_SwinT_OGC.py")
    print(CONFIG_PATH, "; exist:", os.path.isfile(CONFIG_PATH))


    from groundingdino.util.inference import load_model, load_image, predict, annotate

    model = load_model(CONFIG_PATH, WEIGHTS_PATH)
    print("DONE")
    return model

def object_detection(model, image_path, text_prompt="coffee cup", box_treshold=0.35, text_treshold=0.25):
    device = torch.device("cpu")
    IMAGE_SIZE = (224, 224)

    #IMAGE_PATH = os.path.join(os.getcwd(),'..\Coffee_photos\images\\1-50')
    #print(IMAGE_PATH)
    image_source, image = load_image(image_path)

    boxes, logits, phrases = predict(
        model=model, 
        image=image, 
        device=device,
        caption=text_prompt, 
        box_threshold=box_treshold, 
        text_threshold=text_treshold
        )
    print(boxes, logits, phrases)


    #TODO: chack if there is more than 1 object in the image

    annotated_frame = annotate(image_source=image_source, boxes=boxes, logits=logits, phrases=phrases)
    sv.plot_image(annotated_frame, (16, 16))
    return boxes, logits, phrases

def resize_image(image_path, new_image_path, size=(224, 224)):
    image = cv2.imread(image_path)
    image = cv2.resize(image, size)
    cv2.imwrite(new_image_path, image)
    return new_image_path

if __name__ == "__main__":
    model = load_groundingdino()
    image_path = os.path.join(os.getcwd(),'..\\Coffee_photos\\images\\1-50')
    for filename in os.listdir(image_path):
        if filename.endswith(".jpg"):
            new_image_path = os.path.join(image_path,filename)
            object_detection(model, new_image_path)
    #resize_image(image_path, new_image_path)

