# Ignore warnings in ipynb
import warnings
warnings.filterwarnings('ignore')
import os
import supervision as sv
import numpy as np
import torch
import random
import cv2
from PIL import Image
import matplotlib.pyplot as plt
from groundingdino.util.inference import load_model, load_image, predict, annotate
from torchvision.ops import box_convert

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
    try:
        # Change permissions for the file
        os.chmod(image_path, 0o777)
        # Open the image file
        with Image.open(image_path) as img:
            # Resize the image
            resized_img = img.resize(size)
            # Save the resized image to the output path
            resized_img.save(new_image_path)
            print(f"Resized image saved to {new_image_path}")
    except FileNotFoundError:
        print("Input image file not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

def resize_image_return_image(image_path, size=(224, 224)):
    try:
        # Change permissions for the file
        os.chmod(image_path, 0o777)
        # Open the image file
        with Image.open(image_path) as img:
            # Resize the image
            resized_img = img.resize(size)
            # Save the resized image to the output path
            return resized_img
    except FileNotFoundError:
        print("Input image file not found.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def resize_image_folder(image_path, new_image_path, size=(224, 224)):
    for filename in os.listdir(image_path):
        if filename.endswith(".jpg"):
            this_image_path = os.path.join(image_path,filename)
            output_image_path = os.path.join(new_image_path, filename)
            resize_image(this_image_path, output_image_path, size)

    if len(os.listdir(image_path)) == len(os.listdir(new_image_path)):
        print("All images were resized successfully")
    else:
        print("Some images were not resized")

def object_detection_new_image(image_path,boxes, logits, phrases,size=(224, 224)):
    try:
        with Image.open(image_path) as img:
            width, height = img.size
            boxes = boxes * torch.Tensor([width, height, width, height])
            xyxy = box_convert(boxes=boxes, in_fmt="cxcywh", out_fmt="xyxy").numpy()
            print("xyxy: ",xyxy)

            # Assuming only one box and normalized coordinates
            box = xyxy[logits.argmax().item()].tolist()
            print("box: ",box)
            xmin = int(box[0])
            ymin = int(box[1])
            xmax = int(box[2])
            ymax = int(box[3])

            # Ensure correct box reordering
            x1 = min(xmin, xmax)
            y1 = min(ymin, ymax)
            x2 = max(xmin, xmax)
            y2 = max(ymin, ymax)

            # Crop using PIL's "fit" mode to preserve aspect ratio
            cropped_img = img.crop((x1, y1, x2, y2)).resize(size, Image.LANCZOS)  # Assuming target size

            return cropped_img

    except FileNotFoundError:
        print("Input image file not found.")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

if __name__ == "__main__":
    model = load_groundingdino()
    image_path = os.path.join(os.getcwd(),'..\\Coffee_photos\\images\\1-50')
    for filename in os.listdir(image_path):
        if filename.endswith(".jpg"):
            new_image_path = os.path.join(image_path,filename)
            boxes, logits, phrases = object_detection(model, new_image_path)
            print(boxes*torch.tensor([224,224,224,224]))
            cropped_img = object_detection_new_image(new_image_path, boxes, logits, phrases)
            try:
                # Plot the cropped image
                plt.imshow(cropped_img)
                plt.axis('off')  # Hide axis
                plt.show()
            except Exception as e:
                print(f"An error occurred while plotting the image: {e}")

    #image_path = "C:\\git\\other_coffeeML\\coffeeML\\Coffee_photos\\resized_images\\all_images_before_resize"
    #new_image_path = "C:\\git\\other_coffeeML\\coffeeML\\Coffee_photos\\resized_images\\all_images_after_resize_224X224"
    #resize_image_folder(image_path, new_image_path, (224, 224))


