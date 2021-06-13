# BioPass

A customizable web-based password manager that utilizes biometric authentication. Users will be able to select from either voice, face, or gesture authentication in order to access their various passwords. Passwords are securely stored in a centralized database using AES-256 standard encryption. 


**FILE LOCATIONS**

client folder holds the source code for the application front-end

nodeServer folder holds the JavaScript API and source code for the voice authentication and text-to-speech algorithms 


pythonServer folder holds the flask API and source code for the face verification algorithm

  - face profile for facial recognition is enrolled in **addPerson.py**
    - face profile is enrolled when user registers a new account
  
  - face profile is compared to inputted image in **verification.py**
    - Facial verification for sign-in page is done in this algorithm
