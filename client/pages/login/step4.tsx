import { FC, useState } from 'react';
import WebCamAuthenticaion from '../../comps/Layout/loginSteps/Step4/WebCamAuthenticaion';
import styles from "../../styles/LoginSteps/Step4/Step4.module.css"


const step4: FC = () => {
  const [falseAuthentication, setFalseAuthentication] = useState(false);

  const handleClick = (e: any) => {
    e.preventDefault();
  }

  return (
    <div>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>
          Log<span>in</span>
        </h1>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.stepContainer}>
          <h2>Step 4 of 4 Face Authentication</h2>
        </div>

        <div className={styles.webCamSection}>
          <WebCamAuthenticaion />
        </div>

        {falseAuthentication &&
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>Sorry your gesture did not match. Try again!</p>
          </div>}

        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton} onClick={handleClick}>
            Next
          </button>

        </div>
      </div>

    </div>
  )
}

export default step4