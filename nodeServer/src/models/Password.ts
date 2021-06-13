//@ts-ignore
const mongoose = require("mongoose");
//@ts-ignore
const Schema = mongoose.Schema;

//@ts-ignore
const PasswordSchema = new Schema({
  website: String,
  userName: String,
  password: String
})

const Password = mongoose.model("Password", PasswordSchema)
module.exports = Password;