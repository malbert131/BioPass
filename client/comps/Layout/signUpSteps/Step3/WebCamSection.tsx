import { FC, useRef, useState, useEffect } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
// @ts-ignore
import * as fp from "fingerpose";

import ConvertFunctions from "./convert";

import styles from "../../../../styles/SignUpSteps/step3/WebCamSection.module.css";

interface WebCamSectionProps {
  updateGesture: (gesture: string[][]) => void;
}

const WebCamSection: FC<WebCamSectionProps> = ({ updateGesture }) => {

  const webcamRef = useRef<Webcam | null>(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isDetecting, setDetecting] = useState(false);

  ///////// NEW STUFF ADDED STATE HOOK

  const deviceID =
    "b92bca98334678e4afd924e5b9e31a7ded8afcc1363167fca36f749ec21cf338";

  // HERERE GESTURE IS HERE
  // const okGesture = new fp.GestureDescription("okEmoji");

  // const positions = [
  //   ["Thumb", "No Curl", "Diagonal Up Right"],
  //   ["Index", "Half Curl", "Diagonal Up Right"],
  //   ["Middle", "No Curl", "Vertical Up"],
  //   ["Ring", "No Curl", "Vertical Up"],
  //   ["Pinky", "No Curl", "Vertical Up"],
  // ];

  // const positions = [
  //     ["Thumb", "No Curl", "Vertical Up"],
  //     ["Index", "No Curl", "Diagonal Up Right"],
  //     ["Middle", "No Curl", "Horizontal Right"],
  //     ["Ring", "No Curl", "Horizontal Right"],
  //     ["Pinky", "Full Curl", "Horizontal Right"]
  // ]

  // for (let i = 0; i < positions.length; i++) {
  //   const finger = ConvertFunctions.convertFingerToNum(positions[i][0]);
  //   const curl = ConvertFunctions.convertCurlToNum(positions[i][1]);
  //   const direction = ConvertFunctions.convertDirectionToNum(positions[i][2]);
  //   okGesture.addCurl(finger, curl, 1.0);
  //   okGesture.addDirection(finger, direction, 1.0);
  // }

  // // Thumb
  //   okGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.5);
  //   okGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 0.5);
  //   okGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 0.5);
  //   console.log(fp.FingerDirection.DiagonalUpRight);
  // // Index
  //     okGesture.addCurl(fp.Finger.Index, fp.FingerCurl.HalfCurl, 1.0);
  //   okGesture.addDirection(fp.Finger.Index, fp.FingerDirection.DiagonalUpRight, 1.0);
  //   // Middle
  //   okGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0);
  //   okGesture.addDirection(fp.Finger.Middle, fp.FingerDirection.VerticalUp, 1.0);
  //   // Ring
  //   okGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl, 1.0);
  //   okGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 1.0);

  //   // Pinky
  //   okGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl, 1.0);
  //   okGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 1.0);

  ///////// NEW STUFF ADDED STATE HOOK


  // let net: any;
  // const loadModel = async () => {
  //   net = await handpose.load();
  //   console.log("Handpose model loaded.");
  //   setIsLoading(false);
  // }


  // const runHandpose = async () => {
  //   const net = await handpose.load();
  //   console.log("Handpose model loaded.");
  //   //  Loop and detect hands
  //   setInterval(() => {
  //     detect(net);
  //   }, 10);
  // };

  const runDetection = async () => {
    setHasStarted(true)
    setDetecting(true);
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    //  Loop and detect hands
   
    const gesture = await detect(net);
    
    console.log(gesture)
    setDetecting(false);

    updateGesture(gesture);
  
  }

  // const displayDivises = async () => {
  //   const response = await navigator.mediaDevices.enumerateDevices();
  //   console.log(response);
  // };

  // const detectPosition = async (net: any) => {
  //   if (webcamRef.current !== null) {
  //     if (
  //       typeof webcamRef.current !== "undefined" &&
  //       webcamRef.current !== null &&
  //       webcamRef?.current?.video?.readyState === 4
  //     ) {
  //       // Get Video Properties
  //       const video = webcamRef.current.video;
  //       const videoWidth = webcamRef.current.video.videoWidth;
  //       const videoHeight = webcamRef.current.video.videoHeight;

  //       // Set video width
  //       webcamRef.current.video.width = videoWidth;
  //       webcamRef.current.video.height = videoHeight;

  //       // Set canvas height and width

  //       // Make Detections
  //       const hand = await net.estimateHands(video);
  //       console.log(hand);
  //       return hand;
  //     }
  //   }
  // }

  const detect = async (net: any) => {
    // Check data is available
    if (webcamRef.current !== null) {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef?.current?.video?.readyState === 4
      ) {
        // Get Video Properties
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        // Set video width
        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;
        // Set canvas height and width

        // Make Detections
        const hand = await net.estimateHands(video);

        ///////// NEW STUFF ADDED GESTURE HANDLING

        if (hand.length > 0) {
          const GE = new fp.GestureEstimator([
            fp.Gestures.VictoryGesture,
            fp.Gestures.ThumbsUpGesture
          ]);
          const gesture = await GE.estimate(hand[0].landmarks, 6.5);
          // console.log(gesture.poseData);
          if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
            // console.log(gesture.gestures);

            const confidence = gesture.gestures.map(
              (prediction: any) => prediction.confidence
            );
            const maxConfidence = confidence.indexOf(
              Math.max.apply(null, confidence)
            );
            // console.log(gesture.gestures[maxConfidence].name);
          }
          return gesture.poseData;
        }



      }
    }
  };

  const handleCapture = async (e: any) => {
    e.preventDefault();
    await runDetection();
  };
  // useEffect(()=>{runHandpose()},[]);
  

  // useEffect(() => {
  //   loadModel();
  // }, []);

  const renderIsDetecting = () => {
    if (isDetecting) {
      return <h2 className={styles.isLoading}>Detecting...</h2>
    }
    return <h2 className={styles.isLoading}>Accepted!</h2> 
  }

  return (
    <div className={styles.sectionContainer}>
      
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core"></script>
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter"></script>
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl"></script>
      <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/handpose"></script>
            
      <div className={styles.webCamContainer}>
        <Webcam
          ref={webcamRef}
          videoConstraints={{ deviceId: deviceID }}
          mirrored={true}
          height={380}
        />
      </div>

      {!hasStarted && <div className={styles.captureButtonContainer}>
          <button className={styles.captureButton} onClick={handleCapture}>
            Capture Pose
          </button>
      </div>}
      
      {hasStarted && renderIsDetecting()}
        
    </div>
  );
};

export default WebCamSection;
