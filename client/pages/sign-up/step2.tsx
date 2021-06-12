import { FC, useState } from "react";
import styles from "../../styles/SignUpSteps/step2/Step2.module.css";
import Directions from "../../comps/Layout/signUpSteps/Step2/Directions";
import Timer from "../../comps/Layout/signUpSteps/Step2/Timer";
import Recorder from "../../comps/Layout/signUpSteps/Step2/Recorder";
import Util from "../../comps/Layout/Util/util";
import { useRouter } from "next/router";
import Step2Form from "../../comps/Layout/signUpSteps/Step2/Step2Form";

const step2: FC = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const setFormDataPass = (formData: FormData) => {
    setFormData(formData);
  }

  const startTimer = () => {
    setIsStarted(true);
  };

  const router = useRouter();

  const nextHref = "/sign-up/step3"

  const sendDataToAPI = async (keyWord: string) => {
    if (formData) {
      console.log(keyWord)
      await Util.enroll(formData, keyWord);
      // router.push(nextHref);
    }
    
  }

 


  return (
    <div>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>
          Sign<span>Up</span>
        </h1>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.stepContainer}>
          <h2>Step 2 of 4</h2>
        </div>

        <div className={styles.directionsContainer}>
          <Directions />
        </div>

        {/* <button onClick={startTimer}>Lc</button> */}
        
        <div className={styles.timerContainer}>
          {isStarted ? (
            <Timer />
          ) : (
            <div >
              <div>0:25</div>
            </div>
          )}
        </div>

        <div className={styles.recorderContainer}>
          <Recorder startTimer={startTimer} setFormDataPass={setFormDataPass}/>
        </div>

        <Step2Form sendDataToAPI={sendDataToAPI}/>
        
      </div>
    </div>
  );
};

export default step2;
