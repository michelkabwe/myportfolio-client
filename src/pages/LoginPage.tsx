import React from 'react'
import Login from '../components/Login';
import styles from '../styles/LoginPage.module.css';
import { SetStateAction } from 'react';

interface Auth {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage:React.FC<Auth> = ({setIsLoggedIn}) => {




  return (
    <div className={styles.loginPageContainer}>
        <Login setIsLoggedIn={setIsLoggedIn} />
    </div>
  )
}

export default LoginPage