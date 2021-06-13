import { useRouter } from 'next/router';
import { FC, useState, useEffect } from 'react';
import styles from "../../styles/LoginSteps/Step3/Step3.module.css"
import Util from '../../comps/Layout/Util/util';
import Step3WebCam from '../../comps/Layout/loginSteps/Step3/Step3WebCam';

const step3: FC = () => {
  const [falseAuthentication, setFalseAuthentication] = useState(false);
  const [gesturePositions, setGesturePositions] = useState<string[][]>([[]])
  const [gestureGuess, setGestureGuess] = useState("");

  const handleClick = (e: any) => {
    e.preventDefault();
    authenticationGesture();
  }

  const passUpGestureGuess = (guess: string) => {
    setGestureGuess(guess);
    console.log(gestureGuess)
  }


  const getGesture = async () => {
    const gesture = await Util.getGesture()
    setGesturePositions(gesture);
  }
  
  let num = 0
  // @ts-ignore
  useEffect(async () => {
    if (num === 0) {
      await getGesture();
      num++;
    }
  }, [])
  
  


  const router = useRouter()

  const nextHref = "/login/step4"

  const authenticationGesture = () => {
    if (gestureGuess === "authenticationGestureNew") {
      router.push(nextHref)
    } else {
      setFalseAuthentication(true);
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
          <h2>Step 3 of 4 Gesture Authentication</h2>
        </div>

        <div className={styles.recorderContainer}>
          <Step3WebCam authenticationGesture={gesturePositions} falseAuthentication={falseAuthentication} passUpGestureGuess={passUpGestureGuess }/>
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

export default step3