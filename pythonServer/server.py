from flask import Flask, render_template, request, jsonify

from flask_cors import CORS, cross_origin
import os

import numpy as np

import cv2
import base64
from skimage.io import imsave
import urllib
from addPerson import add_Person
from verification import verification


server = Flask(__name__)
cors = CORS(server, resources={r"*": {"origins": "*"}})



@server.route('/enrollFace', methods=["GET", 'POST'])
def enrollFace():
    # # print(request.files , file=sys.stderr)

    
    fileUri = request.get_json(force=True)['imageSrc']
    
    response = urllib.request.urlopen(fileUri)
    with open ("enrollFace.jpg", 'wb') as f:
        f.write(response.file.read())

    # Need to add database values (PERSON_GROUP_ID) for arguments
    personID = add_Person("007", "davinci")

    return jsonify({"personId": personID})

@server.route('/authenticateFace', methods=["GET", 'POST'])
def authenticateFace():

    fileUri = request.get_json(force=True)['imageSrc']
    
    response = urllib.request.urlopen(fileUri)
    with open ("authenticationFace.jpg", 'wb') as f:
        f.write(response.file.read())

    personId = request.args.get('personId')

    # Calling verification function and getting confidence score
    confidenceScore = verification("007", personId)

    if (confidenceScore > 0.65):
        print("FACE AUTH ACCEPTED")
        return jsonify({'isAuthenticated': True})
    else:
        print("FACE AUTH REJECTED")
        return jsonify({'isAuthenticated': False})



if __name__ == '__main__':
    server.run(debug=True)
