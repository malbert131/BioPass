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






# KEYS
from key import FACE_ENDPOINT, FACE_ID_SUBSCRIPTION_KEY
# IMPORTANT
face_client = FaceClient(FACE_ENDPOINT, CognitiveServicesCredentials(FACE_ID_SUBSCRIPTION_KEY))


def verification(PERSON_GROUP_ID, PERSON_ID):
    # Formats Input Image
    input_image = formatImages('./authenticationFace.jpg')

    # Detects Face in Image and Returns ID
    detected_face = face_client.face.detect_with_stream(input_image, detection_model='detection_03')
    # Add the returned face's face ID
    input_image_id = detected_face[0].face_id
    print('{} face(s) detected from image {}.'.format(len(detected_face), input_image))


    # Verification Call and Response
    verify_result_same = face_client.face.verify_face_to_person(input_image_id, PERSON_ID, PERSON_GROUP_ID)
    # Print Response to Console
    print('Faces from {} & {} are of the same person, with confidence: {}'
    .format("INPUT", "REGISTERED_USER", verify_result_same.confidence)
    if verify_result_same.is_identical
    else 'Faces from {} & {} are of a different person, with confidence: {}'
        .format(input_image, "REGISTERED_USER", verify_result_same.confidence))

    return verify_result_same.confidence


# Adds Face Images to Person Object and Formats Images for Model Entry
def formatImages(IMAGE_PATH):
    glob_image = glob.glob(IMAGE_PATH)
    return open(glob_image[0], 'r+b')

# print(verification("007", "e80e440c-86f8-4ba2-8a6f-a6b913ae5ed1"))