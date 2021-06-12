import { FC } from 'react';
import styles from '../../../../styles/SignUpSteps/step2/Step2Form.module.css'
import { useForm } from "react-hook-form";

interface FormValues {
  passPhrase: string;
}

interface Step2FormProps {
  sendDataToAPI: any
}

const Step2Form: FC<Step2FormProps> = ({ sendDataToAPI }) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();





  const submitForm = (data: FormValues) => {
    console.log(data)
    sendDataToAPI(data.passPhrase)

  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(submitForm)}>
      
          <div className={[styles.nameInput, styles.inputContainer].join(" ")}>
            <label htmlFor="passPhrase">Enter Your Pass Phrase</label>
            <input
              {...register("passPhrase", { required: "A pass phrase is required" })}
              id="passPhrase"
              type="text"
            />
            {errors.passPhrase && (
              <p className={styles.errorMessage}>{errors.passPhrase.message}</p>
            )}
          </div>


        <div className={styles.nextButton}>
          <input className={styles.submitButton} type="submit" value="Next" />
        </div>
      </form>
      
    </div>
  )
}

export default Step2Form