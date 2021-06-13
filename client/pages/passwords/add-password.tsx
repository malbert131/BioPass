import { FC } from 'react';
import styles from "../../styles/passwords/addPassword.module.css"

import { useForm, SubmitHandler } from "react-hook-form";
import Util from '../../comps/Layout/Util/util';
import { useRouter } from 'next/router';



interface FormValues {
  website: string;
  userName: string;
  password: string;
}

const addPassword: FC = () => {
 

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  
  const router = useRouter()

  const { website, userName, password } = router.query
  
  let defaultWebsite = ""
  if (typeof website === 'string') defaultWebsite = website

  let defaultUserName = ""
  if (typeof userName === 'string') defaultUserName = userName

  let defaultPassword = ""
  if (typeof password === 'string') defaultPassword = password

  const nextHref = "/passwords"

  
  const submitForm = async (data: FormValues) => {
    // send data and make and object
    await Util.createNewPassword(data);
    router.push(nextHref)
  }

  return (
    <>
    <div className={styles.headerContainer}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Add <span>Password</span>
          </h1>
      </div>
    </div>
      
    <div className={styles.outerWrapper}>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <div
            className={[styles.recipientContainer, styles.inputContainer].join(
              " "
            )}
          >
            <label htmlFor="website">Website</label>
            <input {...register("website", { value: defaultWebsite, required: "This field is required" })} id="recipient" type="text" />
            {errors.website && <p className={styles.errorMessage} >{errors.website.message}</p>}
          </div>

         
          <div
            className={[styles.recipientContainer, styles.inputContainer].join(
              " "
            )}
          >
            <label htmlFor="userName">User Name</label>
            <input {...register("userName", { value: defaultUserName, required: "This field is required" })} id="recipient" type="text" />
            {errors.userName && <p className={styles.errorMessage} >{errors.userName.message}</p>}
          </div>

          <div
            className={[styles.recipientContainer, styles.inputContainer].join(
              " "
            )}
          >
            <label htmlFor="password">Password</label>
            <input {...register("password", { value: defaultPassword, required: "This field is required" })} id="recipient" type="text" />
            {errors.password && <p className={styles.errorMessage} >{errors.password.message}</p>}
          </div>

          <input className={styles.submitButton} type="submit" value="Create Password" />
        </form>
      </div>
    </div>
    </>
  );
};

export default addPassword;
