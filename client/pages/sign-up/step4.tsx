import { FC, useState } from 'react';
import styles from "../../styles/SignUpSteps/step4/Step4.module.css"
import DirectionsStep4 from '../../comps/Layout/signUpSteps/Step4/DirectionsStep4';
import WebCamSectionStep4 from '../../comps/Layout/signUpSteps/Step4/WebCamSectionStep4';
import Util from '../../comps/Layout/Util/util';
import { useRouter } from 'next/router';

const step4: FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>("");

  const updateImageSrc = (src: string | null) => {
    setImageSrc(src);
  }

  const router = useRouter()

  const nextHref = "/passwords"

  const handleUpload = async (e: any) => {
    e.preventDefault();

    if (typeof imageSrc === "string") {
      // const imageFile = new File(blob, "tes.jpg")
  
      await Util.startFaceRecog(imageSrc)
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
          <h2>Step 4 of 4 Almost Done!</h2>
        </div>

        <div className={styles.directionsContainer}>
          <DirectionsStep4 />
        </div>
        
        <div className={styles.webCamContainer}>
          <WebCamSectionStep4 updateImageSrc={updateImageSrc} />
        </div>

        <div className={styles.nextButtonContainer}>
          <button className={styles.nextButton} onClick={handleUpload} >Next</button>
        </div>

      </div>

      

    </div>
  )
}

export default step4