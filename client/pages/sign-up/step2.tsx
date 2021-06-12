import { FC, useState } from "react";
import styles from "../../styles/SignUpSteps/step2/Step2.module.css";
import Directions from "../../comps/Layout/signUpSteps/Step2/Directions";
import Timer from "../../comps/Layout/signUpSteps/Step2/Timer";

const step2: FC = () => {
  const [isStarted, setIsStarted] = useState(false);

  const startTimer = () => {
    setIsStarted(true);
  };

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
        
        <div className={styles.timerContainer}>
          {isStarted ? (
            <Timer />
          ) : (
            <div >
              <div>0:25</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default step2;
