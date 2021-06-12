const express = require('express')
const app = express()

const morgan = require("morgan");
const cors = require("cors");
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');

const multer  = require('multer') 
const upload = multer(); 
const fs = require('fs'); 

const PORT = 4000

//midele ware
app.use(cors())
app.use(morgan('dev'))
app.use(errorhandler())
app.use(bodyParser.json())


app.post('/enroll', upload.single('soundBlob'), (req, res, next) => {
  try {
    let uploadLocation = "./src/pre-executed.mp3"// where to save the file to. make sure the incoming name has a .wav extension
    //  let uploadLocation = "./ThisMadeIt.mp3"// where to save the file to. make sure the incoming name has a .wav extension

    fs.writeFileSync(uploadLocation, Buffer.from(new Uint8Array(req.file.buffer))); // write the blob to the server as a file

    // Then call the mothods
    res.sendStatus(200); //send back that everything went ok
    
  } catch (err: any) {
    next(err)
  }
  
})
 
app.listen(PORT, () => {
  console.log('The server is listening on port: ' + PORT);
})