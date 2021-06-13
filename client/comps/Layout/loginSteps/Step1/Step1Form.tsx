import { FC } from "react";
import { useForm } from "react-hook-form";
import styles from "../../../../styles/LoginSteps/Step1/Step1Form.module.css"
import { useRouter } from 'next/router'
import Util from '../../Util/util';
import useSetUuid from "../../Util/useSetUuid";


interface FormValues {
  email: string;
}

const Step1Form: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const nextHref = "/login/step2"

  const submitForm = async (data: FormValues) => {
    // Send data to the api
    console.log(data.email);
    await useSetUuid(data.email)
    router.push(nextHref)
  };

  return (
    <div>
      <div className={styles.formContainer}></div>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className={styles.borderContainer}>

          <div className={[styles.emailInput, styles.inputContainer].join(" ")}>
            <label htmlFor="email">Email</label>
            <input
              {...register("email", { required: "This field is required" })}
              id="email"
              type="email"
            />
            {errors.email && (
              <p className={styles.errorMessage}>{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className={styles.nextButton}>
          <input className={styles.submitButton} type="submit" value="Next" />
        </div>
      </form>
    </div>
  );
};

export default Step1Form;
