import { FC } from "react";
import styles from "../../styles/SignUpSteps/step1/Step1.module.css";
import Step1Form from "../../comps/Layout/signUpSteps/Step1/Step1Form";

const step1: FC = () => {
  return (
    <div>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>
          Sign<span>Up</span>
        </h1>
      </div>
    
      <div className={styles.formContainer}>
        <div className={styles.stepContainer}>
          <h2>Step 1 of 4</h2>
        </div>

        <Step1Form />
      </div>
     
    </div>
  );
};

export default step1;
