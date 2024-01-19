import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import { FaUserCircle } from "react-icons/fa";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



interface Auth {
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}



const NavBar: React.FC<Auth> = ({ isLoggedIn, setIsLoggedOut, setIsLoggedIn }) => {

  const navigate = useNavigate();

  const handleAuth = () => {
    console.log("Logged OUT")
    localStorage.removeItem('isLoggedIn');
    setIsLoggedOut(true);
    setIsLoggedIn(false);
    setTimeout(() => {
      navigate('/LoginPage');
    }, 2000);

  }

  return (
    <nav className={styles.nav_wrapper}>
      <ul className={styles.nav_ul}>
        <li>
          <Link to="/">HOME</Link>
          <Link to="/Projects">PROJECTS</Link>
          {isLoggedIn ?
            <Link to="/AdminPage">
              <FaUserCircle className={styles.admin_icon} style={{ color: '#ffffff', marginLeft: '3rem', fontSize: '1.5rem' }} />
            </Link> : (
              ''
            )}
          {isLoggedIn ?
            <FaSignInAlt className={styles.logout_btn} style={{ color: '#ffffff', marginLeft: '3rem', fontSize: '1.5rem', cursor: 'pointer' }} onClick={handleAuth} />
            : ('')
          }
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
