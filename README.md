# BioPass

A customizable web-based password manager that utilizes biometric authentication. Users will be able to select from either voice, face, or gesture authentication in order to access their various passwords. Passwords are securely stored in a centralized database using AES-256 standard encryption. 

Hackathon Demo:


https://user-images.githubusercontent.com/66640918/188283724-54116dff-7ea8-4409-b823-22f22a40a88b.mp4

Password Page View:


![4j7yr5k636y6dqq6vsqgq7q179amv1asxtwp67ubkv5uscb7h6smr6hsibcjaq5g1q](https://user-images.githubusercontent.com/66640918/188284535-dd96269d-9c83-4cae-8d92-f7b8914b2edf.png)


Database View of User Account:

![au1uee2vbjo92znpet3q749299wwxtpajeescbhrgd7te1sauhr9devg8katra7ew5](https://user-images.githubusercontent.com/66640918/188284538-3ede59ed-0c3d-4def-8f34-dc2778a68fc5.png)



**FILE LOCATIONS**

client folder holds the source code for the application front-end

  - TensorFlow gesture recognition is located in **Step3WebCam.tsx** in BioPass/client/comps/Layout/loginSteps/Step3/

nodeServer folder holds the JavaScript API and source code for the voice authentication and speech-to-text algorithms 

  - A new voice profile for speaker verification is enrolled into the database in **enroll.ts**
    - used when user registers a new account
  
  - Voice profile is matched against inputted audio on sign-in page in **authenticate.ts**
    - This is the main voice authentication algorithm and returns accepted or denied depending on if the inputted audio matches the previously enrolled voice profile

pythonServer folder holds the flask API and source code for the face verification algorithm

  - face profile for facial recognition is enrolled in **addPerson.py**
    - face profile is enrolled when user registers a new account
  
  - face profile is compared to inputted image in **verification.py**
    - Facial verification for sign-in page is done in this algorithm
    - Returns accepted if inputted image on sign-in matches face profile created at account enrollment
    - If image does not match, denied is sent to the front-end
