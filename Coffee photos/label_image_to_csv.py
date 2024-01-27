import csv
import os
import re
from PIL import Image
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
# Define the data to write to the CSV file
colum_names = [
    ['image_name', 'crema', 'color_clarity', 'presentation','type_of_cup', "is_relevant"]
]
# Crema	            yes \ no	                (1 \ 0)
# Color& Clarity	bright \Brown\ dark	        (0\1\2)
# Presentation	    Beautiful draw (scale)  	(0\1\2)
# Type of Cup	    Take away \ cup	            (1 \ 0)
# is_relevant	    yes \ no	                (1 \ 0)



# Specify the target folder and CSV file name
TARGET_FOLDER = 'C:\\git\\coffeeML\\coffeeML\\Coffee photos\\target_csv_images' 
SOURCE_FOLDER = 'C:\\git\\coffeeML\\coffeeML\\Coffee photos\\source_images' 
CSV_FILE_NAME = 'sample_1.csv'

# Create the full path to the CSV file
CSV_FILE_PATH = f'{TARGET_FOLDER}/{CSV_FILE_NAME}'


def file_exists_in_folder(file_name, target_folder):
    file_path = os.path.join(target_folder, file_name)
    return os.path.isfile(file_path)


def create_csv_file(target_folder, csv_file_path, colum_names):
    # Open the CSV file for writing
    with open(csv_file_path, 'w', newline='') as csv_file:
        # Create a CSV writer object
        csv_writer = csv.writer(csv_file)
        
        # Write the data to the CSV file
        for row in colum_names:
            csv_writer.writerow(row)

    print(f'CSV file "{csv_file_path}" created in "{target_folder}"')



def classify_images(source_folder, csv_file_path):
    # run sorce file and plot all images
    # Check if the directory exists
    if not os.path.exists(source_folder):
        print(f"Directory '{source_folder}' does not exist.")
        return

    # List all files in the directory
    file_list = os.listdir(source_folder)

    # Filter only JPG files
    jpg_files = [file for file in file_list if file.lower().endswith('.jpg')]

    if not jpg_files:
        print(f"No JPG files found in '{source_folder}'.")
        return

    # Loop through JPG files and plot them
    for jpg_file in jpg_files:
        file_path = os.path.join(source_folder, jpg_file)
        
        # Load the image using matplotlib
        img = mpimg.imread(file_path)  # Replace with the path to your JPG file

        # Display the image
        plt.imshow(img)
        plt.axis('off')  # Optional: Turn off axis labels and ticks
        plt.show(block=False)

        file_name = jpg_file.split('.')[0]
        creama = ""
        color_clarity = ""
        presentation = ""
        type_of_cup = ""
        is_relevant = ""

        # get valid user input for each image 
        while not re.match(r'[0-1]', creama) or not re.match(r'[0-2]', color_clarity) or not re.match(r'[0-2]', presentation) or not re.match(r'[0-1]', type_of_cup) or not re.match(r'[0-1]', is_relevant):
            print("="*80)
            print(f'file name: {file_name}/n')

            print(f'is relevant:         yes \\ no	                (1 \\ 0)')
            is_relevant = input(f"enter {file_name} is relevant parameter:")
            print ("Crema	            yes \\ no	                (1 \\ 0)")
            creama = input(f"enter {file_name} creama parameter:")
            print ("Color& Clarity	    bright \\Brown\\ dark	    (0\\1\\2)")
            color_clarity = input(f"enter {file_name} color clarity parameter:")
            print ("Presentation	    Beautiful draw (scale)      (0\\1\\2)")
            presentation = input(f"enter {file_name} presentation parameter:")
            print ("Type of Cup	        Take away \\ cup            (1 \\ 0)")
            type_of_cup = input(f"enter {file_name} type of cup parameter:")
            print("="*80)
    
        with open(csv_file_path, 'a', newline='') as f:
            writer = csv.writer(f)
            writer.writerow([file_name, creama, color_clarity, presentation, type_of_cup, is_relevant])
            print(file_name, creama, color_clarity, presentation, type_of_cup)  
    

    
if __name__ == "__main__": 

    # Open the CSV file for writing
    count = 1
    while file_exists_in_folder(CSV_FILE_NAME, TARGET_FOLDER):
        count += 1
        temp_csv_name = CSV_FILE_NAME.split('_')[0]
        CSV_FILE_NAME = f'{temp_csv_name}_{count}.csv'
        CSV_FILE_PATH = f'{TARGET_FOLDER}/{CSV_FILE_NAME}'

    create_csv_file(TARGET_FOLDER, CSV_FILE_PATH, colum_names)
    classify_images(SOURCE_FOLDER, CSV_FILE_PATH)

