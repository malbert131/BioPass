import { FC, useEffect, useState } from 'react';
import styles from "../../../styles/passwords/PasswordsSection.module.css"
import Password from './Password';
import Util from '../Util/util';

interface password {
  _id: string;
  website: string;
  userName: string;
  password: string;
}

const PasswordsSection: FC = () => {

  const [passwordsData, setPasswordsData] = useState<password[]>();

  //@ts-ignore
  useEffect(async () => {
    const data = await Util.getAllPasswords();
    setPasswordsData(data)
  }, [])
  return (
    <div>
      <div className={`${styles.contentHeader} ${styles.txnHeader} ${styles.border}`}>
        <div style={{ width: "35%" }}>Website</div>
        <div style={{ width: "27.5%" }}>User Name</div>
        <div style={{ width: "27.5%" }}>Password</div>
        <div style={{ width: "10%" }}>Mutations</div>
      </div>

      <div className={styles.passwordsContainer}>
        {passwordsData && passwordsData.map(({website, userName, password, _id}) => {
          return <Password key={_id} id={_id} website={website} userName={userName} password={password}/>
        })}
      </div>
    </div>
  )
}

export default PasswordsSection