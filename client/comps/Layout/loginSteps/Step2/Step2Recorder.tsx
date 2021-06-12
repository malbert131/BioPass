import { FC, useState, useEffect } from "react";
// @ts-ignore
import MicRecorder from "mic-recorder-to-mp3";
import styles from "../../../../styles/LoginSteps/Step2/Step2Recorder.module.css"

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

interface Step2RecorderProps {
  setFormDataPass: (formData: FormData) => void;
}

const Step2Recorder: FC<Step2RecorderProps> = ({ setFormDataPass }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [blobUrl, setBlobUrl] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        setIsBlocked(false);
      },
      () => {
        console.log("Permission Denied");
        setIsBlocked(true);
      }
    );
  }, []);

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setIsRecording(true);
        })
        .catch((e: any) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]: any) => {
        const blobURL = URL.createObjectURL(blob);
        setIsRecording(false);
        console.log("stoped")
        setBlobUrl(blobURL);
        passUpData(blob)
      })
      .catch((e: any) => console.log(e));
  };



  const passUpData = (blob: any) => {
    const formData = new FormData();
    formData.append('soundBlob', blob, 'pre-executed.mp3');
    setFormDataPass(formData);
  }

  return (
    <div className={styles.recorderContainer }>
      {isRecording ? (
        <div>
          <h2 className={styles.recodingH2}>Recording...</h2>
          <button className={ styles.recordButton} onClick={stop} disabled={!isRecording}>
            Stop
          </button>
        </div>
        
      ) : (
          <button className={ styles.recordButton}onClick={start} disabled={isRecording}>
          Record
        </button>
      )}

      <audio src={blobUrl} controls={true} />
    </div>
  );
};

export default Step2Recorder;
