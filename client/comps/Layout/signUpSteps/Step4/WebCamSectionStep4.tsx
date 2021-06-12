import { FC, useRef, useState } from "react";
import styles from "../../../../styles/SignUpSteps/step4/WebCamSectionStep4.module.css";
import Webcam from "react-webcam";

interface WebCamSectionStep4Props {
  updateImageSrc: (src: string | null) => void;
}

const WebCamSectionStep4: FC<WebCamSectionStep4Props> = ({updateImageSrc}) => {

  const deviceID =
    "b92bca98334678e4afd924e5b9e31a7ded8afcc1363167fca36f749ec21cf338";

  const webcamRef = useRef<Webcam>(null);

  const [screenShotSrc, setScreenShotSrc] = useState<string | null>();

  const takeScreenShot = () => {
    if (webcamRef.current !== null) {
      const imageSrc = webcamRef.current.getScreenshot();
      setScreenShotSrc(imageSrc);
      
      updateImageSrc(imageSrc);
    }
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.webCamContainer}>
        {screenShotSrc ? (
          <img src={screenShotSrc} className={styles.screenShot} />
        ) : (
          <Webcam
            ref={webcamRef}
            videoConstraints={{ deviceId: deviceID }}
            screenshotFormat="image/jpeg"
            mirrored={true}
            height={380}
          />
        )}
      </div>

      {screenShotSrc ? (
        <h2 className={styles.isLoading}>Captured</h2>
      ) : (
          <div className={styles.captureButtonContainer}>
            <button className={styles.captureButton} onClick={takeScreenShot}>
              Capture Image
            </button>
          </div>
      )}
    </div>
  );
};

export default WebCamSectionStep4;
