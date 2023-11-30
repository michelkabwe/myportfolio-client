import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Nav.module.css";




const NavBar: React.FC = () => {
  return (
    <nav className={styles.nav_wrapper}>
      <ul className={styles.nav_ul}>
        <li>
          <Link to="/">HOME</Link>
          <Link to="/Project">PROJECTS</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
