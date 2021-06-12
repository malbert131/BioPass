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

# Creates Person object in Person Group
def add_Person(NAME, PERSON_GROUP_ID):
    new_user = face_client.person_group_person.create(PERSON_GROUP_ID, NAME)
    image = formatImages('./IMG_1240.JPG') # ADD PATH TO ENROLLMENT IMAGE
    # Adds Enrollment Image to New User Profile (aka new Person Object)
    face_client.person_group_person.add_face_from_stream(PERSON_GROUP_ID, new_user.person_id, image, detection_model='detection_03')
    train_Person_Group(PERSON_GROUP_ID)
    return new_user.person_id


# Adds Face Images to Person Object and Formats Images for Model Entry
def formatImages(IMAGE_PATH):
    glob_image = glob.glob(IMAGE_PATH)
    return open(glob_image[0], 'r+b')


# Function to Train the PersonGroup Object with Inputed Images
# Object will train after new Person object is added to the Person Group
def train_Person_Group(PERSON_GROUP_ID):
    print()
    print('Training the person group...')
    # Train the person group
    face_client.person_group.train(PERSON_GROUP_ID)

    while (True):
        training_status = face_client.person_group.get_training_status(PERSON_GROUP_ID)
        print("Training status: {}.".format(training_status.status))
        print()
        if (training_status.status is TrainingStatusType.succeeded):
            break
        elif (training_status.status is TrainingStatusType.failed):
            face_client.person_group.delete(person_group_id=PERSON_GROUP_ID)
            sys.exit('Training the person group has failed.')
        time.sleep(5)


# # print(add_Person("test", "007"))

# face_client.person_group_person.delete("007", "e80e440c-86f8-4ba2-8a6f-a6b913ae5ed1")
# print(face_client.person_group_person.get("007", "e80e440c-86f8-4ba2-8a6f-a6b913ae5ed1"))
