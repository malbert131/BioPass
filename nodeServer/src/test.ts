// import { VoiceProfile } from "microsoft-cognitiveservices-speech-sdk";
// import authentication from "./authenticate";
// import enroll, { client } from "./enroll";
// import executeWavCommand from "./exec";

// async function start() {
//     await executeWavCommand()
//     const profile : VoiceProfile = await enroll()

    
//     await authentication(profile)


//     if (profile !== null) {
//         console.log ("Deleting profile ID: " + profile.profileId);
//         await new Promise ((resolve, reject) => {
//             client.deleteProfileAsync (profile, result => { resolve(result); }, error => { reject(error); });
//         });
//     }
// }

// start()
