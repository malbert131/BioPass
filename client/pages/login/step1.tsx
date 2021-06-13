import { FC } from 'react';
import Step1Form from '../../comps/Layout/loginSteps/Step1/Step1Form';
import styles from "../../styles/LoginSteps/Step1/step1.module.css"

const step1: FC = () => {
  return (
    <div>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>
          Log<span>in</span>
        </h1>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.stepContainer}>
          <h2>Step 1 of 4</h2>
        </div>

        <div className={styles.formContainer}>
          <Step1Form />
        </div>
      </div>
    </div>
  )
}

export default step1