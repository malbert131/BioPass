from flask import Flask, render_template, request, jsonify

from flask_cors import CORS, cross_origin
import os

import numpy as np

import cv2
import base64
from skimage.io import imsave
import urllib


server = Flask(__name__)
cors = CORS(server, resources={r"*": {"origins": "*"}})



@server.route('/enrollFace', methods=["GET", 'POST'])
def enrollFace():
    # # print(request.files , file=sys.stderr)

    
    fileUri = request.get_json(force=True)['imageSrc']
    
    response = urllib.request.urlopen(fileUri)
    with open ("enrollFace.jpg", 'wb') as f:
        f.write(response.file.read())

    return "DaBaby"

if __name__ == '__main__':
    server.run(debug=True)
