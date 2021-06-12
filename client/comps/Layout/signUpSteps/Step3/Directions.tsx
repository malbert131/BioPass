import { FC } from 'react';
import styles from "../../../../styles/SignUpSteps/step3/Directions.module.css"

const Directions: FC = () => {
  return (
    <div>
      <div className={styles.container}>
      <div className={styles.directionContainer}>
        <span className={styles.directionHeader}>Directions</span>
        <p className={styles.directions}>This is the Gesture Authentication Enrollment Page<br/>Show Your Unique Hand Gesture to the Camera and Select "Capture Pose"<br/>This Gesture Will Act as an Identifier to Unlock Your Passwords<br/><strong>(Please Hold the Pose Until the Authenticator Shows "Accepted!")</strong></p>
      </div>

    </div>
    </div>
  )
}

export default Directions