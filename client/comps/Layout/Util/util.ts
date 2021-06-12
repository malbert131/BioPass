const axios = require('axios');

const baseUrl = "http://localhost:4000"

const Util = {
  
  async enroll (audioData: FormData, keyWord: string) {
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

  async sendGesture(gestureData: string[][]) {
    
    await axios.post(`${baseUrl}/sendGesture`, gestureData)
    console.log("Sent");
  }
}

export default Util;