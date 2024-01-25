import React from "react";
import { BiMenuAltRight } from "react-icons/bi";
import styles from "../styles/NavResponsive.module.css";
import { TfiClose } from "react-icons/tfi";
import LiInLogo from "../assets/LI-In-Bug.png";
import GitHLogo from "../assets/github-mark.png";
import { Link } from "react-router-dom";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavResponsive: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const closeNav = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.menu_icon_wrapper}>
      <BiMenuAltRight
        className={styles.menu_icon}
        size="1.5em"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div className={`${styles.nav_drop_down} ${isOpen ? styles.open : ""}`}>
        <div className={styles.close_btn}>
          <div className={styles.social_btn_wrapper}>
            <img
              src={LiInLogo}
              alt="Linkedin Logo"
              className={styles.social_logos}
            />
            <img
              src={GitHLogo}
              alt="Github Logo"
              className={styles.social_logos}
            />
          </div>
          <TfiClose onClick={() => setIsOpen(!isOpen)} size="1.5em" />
        </div>

        <div className={styles.mobile_nav_wrapper}>
          <ul className={styles.mobile_nav_ul}>
            <li className={styles.mobile_nav_li}>
              <Link to="/" onClick={closeNav}>
                HOME
              </Link>
            </li>
            <li className={styles.mobile_nav_li}>
              <Link to="/projects" onClick={closeNav}>
                PROJECTS
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavResponsive;
