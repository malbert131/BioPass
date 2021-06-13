import { FC, useRef, useState } from 'react';
import styles from "../../../styles/passwords/Password.module.css"
import Link from "next/link"
import eyeLogo from "./eye.png"
import Util from '../Util/util';
import { useRouter } from 'next/router';


interface PasswordProps {
  website: string;
  userName: string;
  password: string;
  id: string;
}

const Password: FC<PasswordProps> = ({ website, userName, password, id }) => {
  
  const deletePassword = () => {

    Util.deletePassword(id)

    window.location.reload();
  }

  const [isVisible, setIsVisible] = useState(false);

  const changeStateOfPassword = () => {
    const el = document.getElementById(id)

    if (!isVisible) {

      el?.classList.remove(styles.passwordHidden);
      setIsVisible(true)
    } else if (isVisible) {
    
      el?.classList.add(styles.passwordHidden);
      setIsVisible(false);
    }
  }

  const router = useRouter();
  const editPassword = () => {
    Util.deletePassword(id)
    router.push({ pathname: '/passwords/add-password', query: { website: website, userName: userName, password: password} })
  }

  return (
    <div id="sectionWrapper" className={[styles.section, styles.border].join(" ")}>

      <div style={{width: "35%"}}>
        <div className={`${styles.spanWrapper} ${styles.hiddenText}`}>
          <Link href={website}>
            <a>
              <span className={`${styles.blockSpan} ${styles.hoverLink}`}>{ website }</span>
            </a>
          </Link>
          
        </div>
      </div>

      <div style={{width: "27.5%"}}>
        <div className={styles.spanWrapper}>
          <span className={styles.blockSpan}>{ userName }</span>
        </div>
      </div>

      <div style={{width: "27.5%"}}>
        <div className={[styles.spanWrapper, styles.passwordWrapper].join(" ")}>
          <span id={id} className={[styles.blockSpan, styles.passwordHidden].join(" ")} >{ password }</span>
          <img onClick={changeStateOfPassword } className={styles.eyeLogo} src={eyeLogo}></img>
        </div>
      </div>

      <div style={{width: "10%"}} className={styles.mutationsContainer}>
        <span onClick={editPassword}className={styles.mutation}>Edit</span>
        <span onClick={deletePassword}className={styles.mutation}>Remove</span>
      </div>


    </div>
  )
}

export default Password