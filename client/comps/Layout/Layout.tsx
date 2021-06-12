import { FC, ReactNode } from 'react';
import styles from "../../styles/Layout.module.css"
// @ts-ignore
import logo from "./icons8-lock.gif";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({children}) => {
  return (
    <div className={styles.container}>
      <div className={styles.topDiv}>
        <div className={styles.textContainer}>
          <div>
            Bio <span className={styles.colorText}>Pass</span>
          </div>
        </div>
        <img className={styles.gifLogo} src={logo} alt="loading..."/>
      </div>
      <>
        {children}
      </>
    </div>
  )
}

export default Layout