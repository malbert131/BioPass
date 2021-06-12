const axios = require('axios');

const baseUrl = "http://localhost:4000"

const Util = {
  
  async enroll (audioData: FormData) {
    await axios.post(`${baseUrl}/enroll`, audioData, {
      headers: {
        'enctype': 'multipart/form-data'
      }
    })

    console.log("Sent")
  }
}

export default Util;