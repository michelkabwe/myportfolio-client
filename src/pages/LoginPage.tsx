import React from 'react'
import Login from '../components/Login';
import styles from '../styles/LoginPage.module.css';

const LoginPage:React.FC = () => {
  return (
    <div className={styles.loginPageContainer}>
        <Login />
    </div>
  )
}

export default LoginPage