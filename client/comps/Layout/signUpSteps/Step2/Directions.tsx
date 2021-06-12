import { FC } from 'react';
import styles from "../../../../styles/SignUpSteps/step2/Directions.module.css"

const Directions: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.directionContainer}>
        <span className={styles.directionHeader}>Directions</span>
        <p className={styles.directions}>This is the Voice Authentication Enrollment Page<br/>25 Seconds of Enrollment Audio is Required<br/>Please Read and Record the Following Script for 25 seconds to Complete the Enrollment Process</p>
      </div>

      <div className={styles.scriptContainer}>
        <span className={styles.directionHeader}>Script</span>
        <p className={styles.directions}>The FitnessGram Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. Ding  A single lap should be completed each time you hear this sound. Ding  Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, ding </p>
      </div>
    </div>
  )
}

export default Directions