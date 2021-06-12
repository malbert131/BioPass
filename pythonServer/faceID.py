import asyncio
import io
import glob
import os
import sys
import time
import uuid
import requests
from urllib.parse import urlparse
from io import BytesIO
# To install this module, run:
# python -m pip install Pillow
from PIL import Image, ImageDraw
from azure.cognitiveservices.vision.face import FaceClient
from msrest.authentication import CognitiveServicesCredentials
from azure.cognitiveservices.vision.face.models import TrainingStatusType, Person

from key import FACE_ENDPOINT, FACE_ID_SUBSCRIPTION_KEY
# This key will serve all examples in this document.
KEY = FACE_ID_SUBSCRIPTION_KEY

# This endpoint will be used in all examples in this quickstart.
ENDPOINT = FACE_ENDPOINT

# Create an authenticated FaceClient.
face_client = FaceClient(ENDPOINT, CognitiveServicesCredentials(KEY))

# target image for comparison
target_image_file_names = glob.glob("./IMG_1240.JPG")
target = open(target_image_file_names[0], 'r+b')

# source image that is inputted
source_image_file_name1 = glob.glob("./IMG_1242.JPG")
source = open(source_image_file_name1[0], 'r+b')


# Detect face(s) from source image 1, returns a list[DetectedFaces]
# We use detection model 3 to get better performance.
detected_faces1 = face_client.face.detect_with_stream(source, detection_model='detection_03')
# Add the returned face's face ID
source_image1_id = detected_faces1[0].face_id
print('{} face(s) detected from image {}.'.format(len(detected_faces1), source))



# We use detection model 3 to get better performance.
detected_faces = face_client.face.detect_with_stream(target, detection_model='detection_03')
target_image1_id = detected_faces[0].face_id
# Add the returned face's face ID
print('{} face(s) detected from image {}.'.format(len(detected_faces), target))



# Verification example for faces of the same person. The higher the confidence, the more identical the faces in the images are.
# Since target faces are the same person, in this example, we can use the 1st ID in the detected_faces_ids list to compare.
verify_result_same = face_client.face.verify_face_to_face(source_image1_id, target_image1_id)
print('Faces from {} & {} are of the same person, with confidence: {}'
    .format(source_image_file_name1, target_image_file_names[0], verify_result_same.confidence)
    if verify_result_same.is_identical
    else 'Faces from {} & {} are of a different person, with confidence: {}'
        .format(source_image_file_name1, target_image_file_names[0], verify_result_same.confidence))