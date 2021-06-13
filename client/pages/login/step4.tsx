import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import WebCamAuthenticaion from '../../comps/Layout/loginSteps/Step4/WebCamAuthenticaion';
import styles from "../../styles/LoginSteps/Step4/Step4.module.css"
import Util from '../../comps/Layout/Util/util';


const step4: FC = () => {
  const [falseAuthentication, setFalseAuthentication] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const [makeFalse, setMakeFalse] = useState(false);

  const updateImageSrc = (src: string | null) => {
    setImageSrc(src);
  }

  const router = useRouter()

  const nextHref = "/passwords"

  const handleUpload = async (e: any) => {
    e.preventDefault();

    if (typeof imageSrc === "string") {
      // const imageFile = new File(blob, "tes.jpg")
  
      const res = await Util.faceAuthentication(imageSrc)
      if (res) {
        router.push(nextHref)
      } else {
        setFalseAuthentication(true);
      }
      
    }
  
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
          <WebCamAuthenticaion updateImageSrc={updateImageSrc} makeFalse={ makeFalse}/>
        </div>

        {falseAuthentication &&
          <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>Sorry your face was not recognized. Try Again!</p>
          </div>}

        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton} onClick={handleUpload}>
            Next
          </button>

        </div>
      </div>

    </div>
  )
}

export default step4