import { FC } from 'react';
import styles from "../../../styles/passwords/PasswordsSection.module.css"
import Password from './Password';

const PasswordsSection: FC = () => {

  const passwordsData = [{id: "jk2b3fj3bjk2bkjf23", website: "https://www.google.com", userName: "Sthing78", password: "DaBaby87"}]
  return (
    <div>
      <div className={`${styles.contentHeader} ${styles.txnHeader}`}>
        <div style={{ width: "35%" }}>Website</div>
        <div style={{ width: "27.5%" }}>User Name</div>
        <div style={{ width: "27.5%" }}>Password</div>
        <div style={{ width: "10%" }}>Mutations</div>
      </div>

      <div className={styles.passwordsContainer}>
        {passwordsData.map(({website, userName, password, id}) => {
          return <Password key={id} id={id} website={website} userName={userName} password={password}/>
        })}
      </div>
    </div>
  )
}

export default PasswordsSection