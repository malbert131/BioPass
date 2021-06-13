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

def create_Person_Group(PERSON_GROUP_ID):
    # Creates Empty Person Group
    face_client.person_group.create(person_group_id=PERSON_GROUP_ID, name="PRIMARY_GROUP")
    print('Person group:', PERSON_GROUP_ID)


create_Person_Group("007")
# # # Delete Person Group
# # # # Use Later
# face_client.person_group.delete(person_group_id="007")
# print("Deleted the person group {} from the source location.".format("007"))
# # print()