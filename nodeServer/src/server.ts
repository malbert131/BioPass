import enroll from "./enroll";

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


app.post('/enroll', upload.single('soundBlob'), async (req, res, next) => {
  try {
    let uploadLocation = "./pre-executed.mp3"// where to save the file to. make sure the incoming name has a .wav extension
    //  let uploadLocation = "./ThisMadeIt.mp3"// where to save the file to. make sure the incoming name has a .wav extension

    const passPhrase = req.query.passPhrase
    console.log(passPhrase);

    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer)));// write the blob to the server as a file

    //enroll function
    await enroll()

    // Then call the mothods
    res.sendStatus(200); //send back that everything went ok
    
  } catch (err: any) {
    next(err)
  }
  
})

app.post('/authenticateAudio', upload.single('soundBlob'), (req, res, next) => {
  try {
    let uploadLocation = "./pre-executed.mp3"// where to save the file to. make sure the incoming name has a .wav extension
    //  let uploadLocation = "./ThisMadeIt.mp3"// where to save the file to. make sure the incoming name has a .wav extension

    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file

    // Then call the mothods
    res.status(200).send({authenticated: true}); //send back that everything went ok
    
  } catch (err: any) {
    next(err)
  }
  
})

app.post('/sendInitialData', (req, res, next) => {
  try {
    const { name, email } = req.body;
  } catch (error) {
    
  }
})

app.get('/getUuid', (req, res, next) => {
  try {
    // return uuid form mongo with email
    const email = req.query.email

    console.log(email)

    const id = "3jkfbn2jbfo32bfo2bfb23fb23uof23f"

    res.status(201).send({uuid: id})
  } catch (error) {
    next(error)
  }
})


app.post('/sendGesture', (req, res, next) => {
  try {
    const gesture = req.body
    // save gesture in mongo
    res.sendStatus(200);
  } catch (error) {
    next(error)
  }
  

})

app.get('/getGesture', (req, res, next) => {
  try {
    // get gesture form mongo
    const gesture = [ ["Thumb", "No Curl", "Diagonal Up Right"],
     ["Index", "No Curl", "Diagonal Up Right"],
     ["Middle", "No Curl", "Vertical Up"],
     ["Ring", "No Curl", "Vertical Up"],
     ["Pinky", "No Curl", "Vertical Up"]]
    
    res.status(200).send({gesture: gesture})
  } catch (error) {
    next(error)
  }
})

app.get("/getPersonId", (req, res, next) => {
  try {
    // get person Ide form mongo

    const uuid = req.query.uuid

    console.log(uuid)

    const id = "bbfjkwefb3bf23bfb32ufb2u3ifb"

    res.send(200).send({personId: id})
    
  } catch (error) {
    
  }
})

app.post("/sendFacePersonId", (req, res, next) => {
  const personId = req.body.faceRecognitionId

  console.log(personId)

  res.sendStatus(201)
})
 
app.listen(PORT, () => {
  console.log('The server is listening on port: ' + PORT);
})