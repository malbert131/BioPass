const {exec} = require('child_process');

//converts audio file to required format of 16000 HZ, 1 channel, 16 bit, PCM Encoded
const executeWavCommand = async () => {
    const input = "pre-executed.mp3"
    const output = "post-executed.wav"

    const cmd = `ffmpeg -i ${input} -acodec pcm_s16le -ar 16000 -ac 1 ${output}`;
    await exec(cmd, (error) => {
        if (error) {
            console.log("error", error.message)
        }
    })
}


export default executeWavCommand;

