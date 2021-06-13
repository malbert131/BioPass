// @ts-ignore
const mongoose = require('mongoose');
// const audio = require('./Audio.ts')
// const AudioSchema = audio.AudioSchema
// const face = require('./Face.ts')
// // @ts-ignore
// const FaceSchema = face.FaceSchema
// const gesture = require('./Gesture.ts')
// // // @ts-ignore
// const GestureSchema = gesture.GestureSchema

// @ts-ignore
const Schema = mongoose.Schema;
// @ts-ignore
const ObjectId = Schema.ObjectId;



const PersonSchema = new Schema({
    uuid: ObjectId,
    email: String,
    name: String,
    voiceProfile: {
      profileId : String,
      profileType : Number,
      passphrase : String
    },
    face : {
      personID: String
    },
    gesture: {
      fingerPositions: [[String]]
    }
  });

const Person = mongoose.model('Person', PersonSchema);
module.exports = Person;

