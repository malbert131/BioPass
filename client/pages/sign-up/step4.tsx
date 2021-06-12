import { FC } from 'react';
import styles from "../../styles/SignUpSteps/step4/Step4.module.css"
import DirectionsStep4 from '../../comps/Layout/signUpSteps/Step4/DirectionsStep4';

const step4: FC = () => {
  return (
    <div>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>
          Sign<span>Up</span>
        </h1>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.stepContainer}>
          <h2>Step 4 of 4 Almost Done!</h2>
        </div>

        <div className={styles.directionsContainer}>
          <DirectionsStep4 />
        </div>
        
        <div className={styles.webCamContainer}>
          
        </div>

        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton} >Next</button>
        </div>

      </div>

      

    </div>
  )
}

export default step4