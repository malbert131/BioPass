import { VoiceProfile } from "microsoft-cognitiveservices-speech-sdk";
import { SPEECH_REGION, SPEECH_SUBSCRIPTION_KEY } from "./var";


//required variables to access sdk and file system
let sdk = require("microsoft-cognitiveservices-speech-sdk")
let fs = require("fs")
const profile_locale = "en-us"
  
//keys for azure
var subscription_key = SPEECH_SUBSCRIPTION_KEY
var region = SPEECH_REGION

//configuration
const speech_config = sdk.SpeechConfig.fromSubscription(subscription_key, region)
export const client = new sdk.VoiceProfileClient(speech_config)

const ticks_per_second = 10000000
  
//enrollment audio, 20 sec file
const enroll_audio = "post-executed.wav"  //16000 HZ 16 Bit 1 Channel PCM


async function enroll() {
    console.log ("Text Independent Verification:\n")
    //audio enrollment profile for verification
    //**IMPORTANT **//
    var profile : null | VoiceProfile = null;
    try {
        // Creates voice profile
        profile = await new Promise ((resolve, reject) => {
            client.createProfileAsync (sdk.VoiceProfileType.TextIndependentVerification, profile_locale, result => { resolve(result); }, error => { reject(error); });
        })
        console.log ("Created profile ID: " + profile?.profileId);
        await AddEnrollmentsToTextIndependentProfile(client, profile, [enroll_audio])
        // const audio_config = GetAudioConfigFromFile(passphrase_files[0]);
        // const recognizer = new sdk.SpeakerRecognizer(speech_config, audio_config);
        // await SpeakerVerify(profile, recognizer);
    }
    catch (error) {
        console.log ("Error:\n" + error);
    }

    //returns voice profile
    return profile;
}

//Adds required audio to enrollment profile
async function AddEnrollmentsToTextIndependentProfile(client, profile, audio_files)
{
    for (var i = 0; i < audio_files.length; i++) {
        console.log ("Adding enrollment to text independent profile...");
        const audio_config = GetAudioConfigFromFile (audio_files[i]);
        const result : any = await new Promise ((resolve, reject) => {
            client.enrollProfileAsync (profile, audio_config, result => { resolve(result); }, error => { reject(error); });
        });
        if (result.reason === sdk.ResultReason.Canceled) {
            throw(JSON.stringify(sdk.VoiceProfileEnrollmentCancellationDetails.fromResult(result)));
        }
        else {
            console.log ("Remaining audio time needed: " + (result.privDetails["remainingEnrollmentsSpeechLength"] / ticks_per_second) + " seconds.");
        }
    }
    console.log ("Enrollment completed.\n");
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

async function start() {
    console.log(await enroll())
}
start()
export default enroll;