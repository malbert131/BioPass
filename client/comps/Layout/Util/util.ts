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

  async sendInitialData(data: any) {
    await axios.post(`${baseUrl}/sendInitialData`, data)
  },

  async getUuid(email: any) {
    console.log("HERE")
    const res = await axios.get(`${baseUrl}/getUuid`, {
      params: {
        email: email
      }
    })
    console.log("HERE")
    return res.data.uuid
  },

  async faceAuthentication(imageData: string) {
    // MAKE GET UUID FUNCTION
    const uuid = "jlnfwjeknfwef"

    const response = await axios.get(`${baseUrl}/getPersonId`, {
      params: {
        uuid: uuid
      }
    })
    
    
    const personId = response.data.personId;
    console.log('personId')

    const res = await axios.post(`${baseUrlPython}/authenticateFace`, { imageSrc: imageData }, {
      params: {
        personId: personId
      }
    })
    console.log(res.data.isAuthenticated)
    return res.data.isAuthenticated
  },


  async startFaceRecog(imageData: string) {

    const response = await axios.post(`${baseUrlPython}/enrollFace`, {imageSrc: imageData})
    console.log(response.data.personId);
    
    await axios.post(`${baseUrl}/sendFacePersonId`, {faceRecognitionId: response.data.personId})
  }
}

export default Util;