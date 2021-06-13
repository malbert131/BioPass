import { SPEECH_REGION, SPEECH_SUBSCRIPTION_KEY } from "./var";

//required variables
let sdk = require("microsoft-cognitiveservices-speech-sdk")
let fs = require("fs")
//keys
var subscription_key = SPEECH_SUBSCRIPTION_KEY
var region = SPEECH_REGION

//inputted audio that is matched against enrollment profile
let verify_file = "post-executed.wav"

//main authentication function
async function authentication(profile) {
    try {
        const speech_config = sdk.SpeechConfig.fromSubscription(subscription_key, region);
        const audio_config = GetAudioConfigFromFile(verify_file);
        const recognizer = new sdk.SpeakerRecognizer(speech_config, audio_config);
        return await SpeakerVerify(profile, recognizer);
    }
    catch(error) {
        console.log("ERROR", error)
    }
}



//function that verifies audio using azure service
async function SpeakerVerify(profile, recognizer)
{
    const model = sdk.SpeakerVerificationModel.fromProfile(profile);
    const result : any = await new Promise ((resolve, reject) => {
        recognizer.recognizeOnceAsync (model, result => { resolve(result); }, error => { reject(error); });
    });
    console.log ("Verified voice profile for speaker: " + result.profileId + ". Score is: " + result.score + ".\n");
    return result.score;
}



//creates AudioConfig object for inputted audio
function GetAudioConfigFromFile(file) {
    let pushStream = sdk.AudioInputStream.createPushStream();
    fs.createReadStream(file).on("data", function(arrayBuffer) {
        pushStream.write(arrayBuffer.buffer);
    }).on("end", function() {
        pushStream.close();
    });
    return sdk.AudioConfig.fromStreamInput(pushStream);
}

export default authentication