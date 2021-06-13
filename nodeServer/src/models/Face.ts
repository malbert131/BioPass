// @ts-ignore
const mongoose = require('mongoose');

// @ts-ignore
const Schema = mongoose.Schema;
// @ts-ignore
const ObjectId = Schema.ObjectId;

// @ts-ignore
const FaceSchema = new Schema({
    personID: String
  });

const Face = mongoose.model('Face', FaceSchema);
module.exports = { FaceSchema, Face }