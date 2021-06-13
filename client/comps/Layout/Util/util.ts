const axios = require('axios');

const baseUrl = "http://localhost:4000"
const baseUrlPython = "http://127.0.0.1:5000"

const Util = {
  
  async enrollAudio (audioData: FormData, keyWord: string) {
    await axios.post(`${baseUrl}/enroll`, audioData, {
      headers: {
        'enctype': 'multipart/form-data'
      },
      params: {
        passPhrase: keyWord
      },
    })

    console.log("Sent")
  },

  async authenticateAudio(audioData: FormData) {
    const response = await axios.post(`${baseUrl}/authenticateAudio`, audioData, {
      headers: {
        'enctype': 'multipart/form-data'
      }
    })

    console.log("Sent")
    return response.data.authenticated;
},

  async sendGesture(gestureData: string[][]) {
    
    await axios.post(`${baseUrl}/sendGesture`, gestureData)
    console.log("Sent");
  },

  async getGesture() {
    const res = await axios.get(`${baseUrl}/getGesture`)
    console.log(res)
    return res.data.gesture
  },


  async startFaceRecog(imageData: string) {

    await axios.post(`${baseUrlPython}/enrollFace`, {imageSrc: imageData})
    console.log("Sent");
  }
}

export default Util;