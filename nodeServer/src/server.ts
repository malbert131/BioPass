import enroll from "./enroll";
import { VoiceProfile } from 'microsoft-cognitiveservices-speech-sdk';
import authentication from "./authenticate";
import fromFileSTT from "./stt_verification";

const express = require('express')
const app = express()

const morgan = require("morgan");
const cors = require("cors");
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
// @ts-ignore
const Config = require("config-js")
// @ts-ignore
const config = new Config("./mongoKey.ts")

const multer  = require('multer') 
const upload = multer(); 
const fs = require('fs'); 

const PORT = 4000

//importing mongoose Models
const Person = require('./models/Person.ts')



// @ts-ignore
const mongoose = require('mongoose');


//MongoDB Connection
mongoose.connect(config.get("uri"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Clound Atlas Connected")
})

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(errorhandler())
app.use(bodyParser.json())

// enroll audio
app.post('/enroll', upload.single('soundBlob'), async (req, res, next) => {
  try {
    let uploadLocation = "./pre-executed.mp3"// where to save the file to. make sure the incoming name has a .wav extension
    //  let uploadLocation = "./ThisMadeIt.mp3"// where to save the file to. make sure the incoming name has a .wav extension

    const passPhrase = req.query.passPhrase
    console.log(passPhrase);

    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));// write the blob to the server as a file

    //enroll function
    const voiceID = await enroll()

    const id = req.query.uuid
    Person.findOneAndUpdate({uuid : id }, { voiceProfile : { profileId : voiceID, profileType : 2, passphrase : passPhrase}}, (err) => {
      if (err) {
        next(err)
      } else {
        res.sendStatus(200)
      }
    })
    // Then call the methods
    res.sendStatus(200); //send back that everything went ok
    
  } catch (err: any) {
    next(err)
  }
  
})

app.post('/authenticateAudio', upload.single('soundBlob'), async (req, res, next) => {
  try {
    let uploadLocation = "./pre-executed.mp3"// where to save the file to. make sure the incoming name has a .wav extension
    //  let uploadLocation = "./ThisMadeIt.mp3"// where to save the file to. make sure the incoming name has a .wav extension

    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file

    // Then call the methods
    let voiceProfile;
    const uuid = req.query.uuid
    Person.findOne({uuid : uuid}, (err, results) => {
      if (err) {
        next(err)
      } else {
        voiceProfile = results.VoiceProfile
      }
    })

    const pass = voiceProfile.passphrase.toLowerCase()
    const audioProfile = { privId: voiceProfile.profileId, privProfileType : 2} //key names may be profileId and profileType if error arises

    // calling authenticate function
    const confidence_score = await authentication(audioProfile)

    if (confidence_score > 0.60 && fromFileSTT().toLowerCase() === pass) { //maybe async and await for speech-to-text
      console.log("PASSED VOICE AUTH")
      res.status(200).send({authenticated: true}); //send back that everything went ok
    }
    else {
      console.log("FAILED VOICE AUTH")
      res.status(200).send({authenticated : false})
    }
  } catch (err: any) {
    next(err)
  }
  
})

app.post('/sendInitialData', (req, res, next) => {
  try {
    const { name, email } = req.body;

    const new_user = new Person({name: name, email : email, voiceProfile : null, face : null, gesture : null})
    new_user.save();

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

app.get('/getUuid', (req, res, next) => {
  try {
    // return uuid from mongo with email
    const email = req.query.email

    console.log(email)

    Person.findOne({email : email}, (err, results) => {
      if (err) {
        next(err)
      } else {
        console.log("HERE", results)
        res.status(200).send({uuid : results._id})
      }
    })

  } catch (error) {
    next(error)
  }
})



app.post('/sendGesture', (req, res, next) => {
  try {
    const gesture = req.body
    // save gesture in mongo
    const id = req.query.uuid // need id
    Person.findOneAndUpdate({uuid : id }, { gesture : {fingerPositions : gesture }}, (err) => {
      if (err) {
        next(err)
      } else {
        res.sendStatus(200)
      }
    })

  } catch (error) {
    next(error)
  }
})


app.get('/getGesture', (req, res, next) => {
  try {
    // get gesture from mongo
    const uuid = req.query.uuid

    Person.findOne({uuid : uuid}, (err, results) => {
      if (err) {
        next(err)
      } else {
        const gesture = results.gesture.fingerPositions
        res.status(200).send({gesture : gesture})
      }
    })
      
  } catch (error) {
    next(error)
  }
})

app.get("/getPersonId", (req, res, next) => {
  try {
    // get person FACE ID from mongo
    const uuid = req.query.uuid

    Person.findOne({uuid : uuid}, (err, results) => {
      if (err) {
        next(err)
      } else {
        res.status(200).send({personId : results.face.personID})
      }
    })
  } catch (error) {
    next(error)
  }
})

app.post("/sendFacePersonId", (req, res, next) => {
  try {
  const personId = req.body.faceRecognitionId

  console.log(personId)

  const uuid = req.query.uuid
  
  Person.findOneAndUpdate({uuid : uuid }, { face : { personID : personId }}, (err) => {
    if (err) {
      next(err)
    } else {
      res.sendStatus(200)
    }
  })


  res.sendStatus(201)
  }
  catch (error) {
    next(error)
  }
})

app.post("/deletePassword", (req, res, next) => {
  const { passId, uuid } = req.body

  console.log(passId, uuid)

  res.sendStatus(201);
  
})
 
app.listen(PORT, () => {
  console.log('The server is listening on port: ' + PORT);
})