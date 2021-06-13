import { VoiceProfile } from 'microsoft-cognitiveservices-speech-sdk';
// @ts-ignore
const mongoose = require('mongoose');

// @ts-ignore
const Schema = mongoose.Schema;
// @ts-ignore
const ObjectId = Schema.ObjectId;

const AudioSchema = new Schema({
    profileId : String,
    profileType : Number,
    passphrase : String
});

// @ts-ignore
const AudioProf = mongoose.model('AudioProf', AudioSchema);
module.exports = {AudioProf, AudioSchema}