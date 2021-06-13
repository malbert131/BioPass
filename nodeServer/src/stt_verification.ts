import { SPEECH_REGION, SPEECH_SUBSCRIPTION_KEY } from "./var";

//require variables and configuration
const fs = require('fs')
const sdk = require("microsoft-cognitiveservices-speech-sdk")
const speechConfig = sdk.SpeechConfig.fromSubscription(SPEECH_SUBSCRIPTION_KEY, SPEECH_REGION)

//inputed audio verification file
let verify_file = "post-executed.wav"

//Speech-to-Text For Wav File
function fromFileSTT() {
    let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(verify_file));
    
    let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
  
    let text : string | null = null

    recognizer.recognizeOnceAsync(result => {
    
      console.log(`RECOGNIZED: Text=${result.text}`);
    
      text = result.text

      // recognizer.close();
    });
  

    return text
}
// if (fromFileSTT() === "My voice is my passport, verify me") {
//     console.log("ACCESS GRANTED")
// }
// else {
//     console.log("FAILED")
// }


export default fromFileSTT;