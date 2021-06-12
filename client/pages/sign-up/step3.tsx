import { FC, useState } from 'react';
import Directions from '../../comps/Layout/signUpSteps/Step3/Directions';
import WebCamSection from '../../comps/Layout/signUpSteps/Step3/WebCamSection';
import styles from "../../styles/SignUpSteps/step3/Step3.module.css"
import Util from '../../comps/Layout/Util/util';
import { useRouter } from 'next/router';

const step3: FC = () => {

  const [gesturePositions, setGesturePositions] = useState<string[][]>()

  const updateGesture = (gesture: string[][]) => {
    setGesturePositions(gesture);
  }

  const router = useRouter()

  const nextHref = "/sign-up/step4"

  const sendGestureToApi = (e: any) => {
    e.preventDefault();
    if (gesturePositions) {
      Util.sendGesture(gesturePositions);
      router.push(nextHref)
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
          <h2>Step 3 of 4</h2>
        </div>

        <div className={styles.directionsContainer}>
          <Directions />
        </div>

        <div className={styles.webCamContainer}>
          <WebCamSection updateGesture={ updateGesture}/>
        </div>

        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton} onClick={sendGestureToApi}>Next</button>
        </div>
      </div>
    </div>
  )
}

export default step3