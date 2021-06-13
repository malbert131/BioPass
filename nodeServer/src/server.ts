import enroll from "./enroll";
import { VoiceProfile } from "microsoft-cognitiveservices-speech-sdk";
import authentication from "./authenticate";
import fromFileSTT from "./stt_verification";
// import executeWavCommand from './exec';

const {exec} = require('child_process');

//converts audio file to required format of 16000 HZ, 1 channel, 16 bit, PCM Encoded
const executeWavCommand = async () => {
    const input = "./pre-executed.mp3"
    const output = "./post-executed.wav"

    const cmd = `ffmpeg -i ${input} -acodec pcm_s16le -ar 16000 -ac 1 ${output}`;
    await exec(cmd, (error) => {
        if (error) {
            console.log("error", error.message)
        }
    })
}

const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
// @ts-ignore
const Config = require("config-js");
// @ts-ignore
const config = new Config("./mongoKey.ts");

const multer = require("multer");
const upload = multer();
const fs = require("fs");

const PORT = 4000;

//importing mongoose Models
const Person = require("./models/Person.ts");

// @ts-ignore
const mongoose = require("mongoose");

//MongoDB Connection
mongoose.connect(config.get("uri"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Cloud Atlas Connected");
});

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(errorhandler());
app.use(bodyParser.json());

// enroll audio
app.post("/enroll", upload.single("soundBlob"), async (req, res, next) => {
  try {
    let uploadLocation = "./pre-executed.mp3"; // where to save the file to. make sure the incoming name has a .wav extension
    //  let uploadLocation = "./ThisMadeIt.mp3"// where to save the file to. make sure the incoming name has a .wav extension

    const passPhrase = req.query.passPhrase;
    console.log(passPhrase);

    fs.writeFileSync(
      uploadLocation,
      Buffer.from(new Uint8Array(req.file.buffer))
    ); // write the blob to the server as a file
    
    await executeWavCommand()
    //enroll function
    const voiceID = await enroll();

    const id = req.query.uuid;
    console.log(id)
    Person.findOneAndUpdate(
      { _id: id },
      {
        voiceProfile: {
          profileId: voiceID,
          profileType: 2,
          passphrase: passPhrase,
        },
      },
      (err) => {
        if (err) {
          next(err);
        } else {
          res.sendStatus(200);
        }
      }
    );
  } catch (err: any) {
    next(err);
  }
});

app.post(
  "/authenticateAudio",
  upload.single("soundBlob"),
  async (req, res, next) => {
    try {
      let uploadLocation = "./pre-executed.mp3"; // where to save the file to. make sure the incoming name has a .wav extension
      //  let uploadLocation = "./ThisMadeIt.mp3"// where to save the file to. make sure the incoming name has a .wav extension

      fs.writeFileSync(
        uploadLocation,
        Buffer.from(new Uint8Array(req.file.buffer))
      ); // write the blob to the server as a file

      await executeWavCommand()
      // Then call the methods

      const uuid = req.query.uuid;
      Person.findOne({ _id: uuid }, async (err, results) => {
        if (err) {
          next(err);
        } else {
          const voiceProfile = results.voiceProfile;

          const pass = voiceProfile.passphrase.toLowerCase();
          const audioProfile = {
            profileId: voiceProfile.profileId,
            profileType: 2,
          }; //key names may be profileId and profileType if error arises
          
          // calling authenticate function
          const confidence_score = await authentication(audioProfile);
          const text = await fromFileSTT()

          if (confidence_score > 0.6 && text.toLowerCase() === pass) {
            //maybe async and await for speech-to-text
            console.log("PASSED VOICE AUTH");
            res.status(200).send({ authenticated: true }); //send back that everything went ok
          } else {
            console.log("FAILED VOICE AUTH");
            res.status(200).send({ authenticated: false });
          }
        }
      });
    } catch (err: any) {
      next(err);
    }
  }
);

app.post("/sendInitialData", (req, res, next) => {
  try {
    const { name, email } = req.body;

    const new_user = new Person({
      name: name,
      email: email,
      voiceProfile: { profileId: "123", profileType: "2", passphrase: "hello" },
      face: { personID: "456" },
      gesture: { fingerPositions: [["hello"], ["test"]] },
    });
    new_user.save();

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

app.get("/getUuid", (req, res, next) => {
  try {
    // return uuid from mongo with email
    const email = req.query.email;

    console.log(req.query);

    Person.findOne({ email: email }, (err, results) => {
      if (err) {
        next(err);
      } else {
        console.log("HERE", results);
        res.status(200).send({ _id: results._id });
      }
    });
  } catch (error) {
    next(error);
  }
});

app.post("/sendGesture", (req, res, next) => {
  try {
    const gesture = req.body;
    console.log(gesture);
    // save gesture in mongo
    const id = req.query.uuid; // need id
    Person.findOneAndUpdate(
      { _id: id },
      { gesture: { fingerPositions: gesture } },
      (err) => {
        if (err) {
          console.log("DAVINCI ERROR ALERT");
        } else {
          res.sendStatus(200);
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

app.get("/getGesture", (req, res, next) => {
  try {
    // get gesture from mongo
    const uuid = req.query.uuid;

    Person.findOne({ _id: uuid }, (err, results) => {
      if (err) {
        next(err);
      } else {
        const gesture = results.gesture.fingerPositions;
        res.status(200).send({ gesture: gesture });
      }
    });
  } catch (error) {
    next(error);
  }
});

app.get("/getPersonId", (req, res, next) => {
  try {
    // get person FACE ID from mongo
    const uuid = req.query.uuid;

    Person.findOne({ _id: uuid }, (err, results) => {
      if (err) {
        next(err);
      } else {
        res.status(200).send({ personId: results.face.personID });
      }
    });
  } catch (error) {
    next(error);
  }
});

app.post("/sendFacePersonId", (req, res, next) => {
  try {
    const personId = req.body.faceRecognitionId;

    console.log(personId);

    const uuid = req.query.uuid;

    Person.findOneAndUpdate(
      { uuid: uuid },
      { face: { personID: personId } },
      (err) => {
        if (err) {
          next(err);
        } else {
          res.sendStatus(200);
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

app.post("/deletePassword", (req, res, next) => {
  const { passId, uuid } = req.body;

  console.log(passId, uuid);

  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log("The server is listening on port: " + PORT);
});
