import { FC, useState } from "react";
import styles from "../../styles/LoginSteps/Step2/Step2.module.css";
import Step2Recorder from "../../comps/Layout/loginSteps/Step2/Step2Recorder";
import { useRouter } from "next/router";
import Util from "../../comps/Layout/Util/util";

const step2: FC = () => {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [falseAuthentication, setFalseAuthentication] = useState(false);

  const setFormDataPass = (formData: FormData) => {
    setFormData(formData);
  };

  const router = useRouter();

  const nextHref = "/login/step3";

  const sendDataToAPI = async () => {
    if (formData) {
      const res = await Util.authenticateAudio(formData);
      return res;
    }
  };

  const handleClick = async (e: any) => {
    e.preventDefault;
    const response = await sendDataToAPI();
    if (response) {
      router.push(nextHref);
      return;
    }
    setFalseAuthentication(true);
  };

  return (
    <div>
      <div className={styles.titleSection}>
        <h1 className={styles.title}>
          Log<span>in</span>
        </h1>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.stepContainer}>
          <h2>Step 2 of 4: Voice Authentication</h2>
        </div>

        <div className={styles.passPhraseContainer}>
          <h2>Please Record Your Unique Passphrase</h2>
        </div>

        <div className={styles.recordContainer}>
          <Step2Recorder setFormDataPass={setFormDataPass} />
        </div>

        {falseAuthentication &&
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>Sorry Your Voice Did Not Match</p>
          </div>}

        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton} onClick={handleClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default step2;
