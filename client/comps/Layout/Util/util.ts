const axios = require('axios');

const baseUrl = "http://localhost:4000"
const baseUrlPython = "http://127.0.0.1:5000"
import useGetUuid from "./useGetUuid";
import useSetUuid from "./useSetUuid";

const Util = {
  
  async enrollAudio(audioData: FormData, keyWord: string) {
    const uuid = await useGetUuid();
    await axios.post(`${baseUrl}/enroll`, audioData, {
      headers: {
        'enctype': 'multipart/form-data'
      },
      params: {
        passPhrase: keyWord,
        uuid: uuid
      },
    })

    console.log("Sent")
  },

  async authenticateAudio(audioData: FormData) {
    const uuid = await useGetUuid();
    const response = await axios.post(`${baseUrl}/authenticateAudio`, audioData, {
      headers: {
        'enctype': 'multipart/form-data'
      },
      params: {
        uuid: uuid
      }
    })

    console.log("Sent")
    return response.data.authenticated;
},

  async sendGesture(gestureData: string[][]) {
    const uuid = await useGetUuid();
    
    await axios.post(`${baseUrl}/sendGesture`, gestureData, {
      params: {
        uuid: uuid
      }
    })
    console.log("Sent");
  },

  async getGesture() {
    const uuid = await useGetUuid();

    const res = await axios.get(`${baseUrl}/getGesture`, {
      params: {
        uuid: uuid
      }
    })
    console.log(res)
    return res.data.gesture
  },

  async sendInitialData(data: any) {
    await axios.post(`${baseUrl}/sendInitialData`, data)
    await useSetUuid(data.email)
  },

  async getUuid(email: any) {
    const res = await axios.get(`${baseUrl}/getUuid`, {
      params: {
        email: email
      }
    })
    return res.data.uuid
  },

  async faceAuthentication(imageData: string) {
    // MAKE GET UUID FUNCTION
    const uuid = await useGetUuid();

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
  },

  async deletePassword(id: string) {
    const uuid = "ljn32jkf3l2"
    await axios.post(`${baseUrl}/deletePassword`, {passId: id, uuid: uuid})
  }
}

export default Util;