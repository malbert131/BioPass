import { FC } from 'react';
import styles from "../../../../styles/SignUpSteps/step4/DirectionsStep4.module.css"

const DirectionsStep4: FC = () => {
  return (
    <div>
      <div className={styles.container}>
      <div className={styles.directionContainer}>
        <span className={styles.directionHeader}>Directions</span>
        <p className={styles.directions}>This is the Face Verification Enrollment Page.<br/>Please Look Directly Into the Camera and Select "Capture Image"<br/><strong>The Image Will Initialize Your Profile in the Database</strong></p>
      </div>

    </div>
    </div>
  )
}

export default DirectionsStep4