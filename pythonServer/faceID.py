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


