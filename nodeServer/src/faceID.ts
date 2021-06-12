import { ENDPOINT, FACE_ID_SUBSCRIPTION_KEY } from "./var";

//imports
const msRest = require("@azure/ms-rest-js");
const Face = require("@azure/cognitiveservices-face");
const uuid = require("uuid/v4");

//keys and endpoint
const key = FACE_ID_SUBSCRIPTION_KEY
const endpoint = ENDPOINT

//client and configuration
const credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } });
const client = new Face.FaceClient(credentials, endpoint);