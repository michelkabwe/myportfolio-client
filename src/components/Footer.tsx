import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import LiInLogo from "../assets/LI-In-Bug.png";
import GitHLogo from "../assets/github-mark.png";
import ContactModal from "./ContactModal"
import { FaEnvelope } from "react-icons/fa";




const Footer: React.FC = () => {
  const location = useLocation();

  const [showModal, setShowModal] = useState(false);

  const linkedinProfile = "https://www.linkedin.com/in/michel-kabwe-6518843b/";
  const githubProfile = "https://github.com/michelkabwe"
  const isProjectsRoute = location.pathname === '/Projects';

  const openModal = () => {
      setShowModal(prev => !prev)
  }

  return (
    <footer className={`${styles.footer}`} style={{ background: isProjectsRoute ? 'rgb(53, 11, 222)' : 'transparent' }}>
      <div className={styles.social_btn_wrapper}>
        <a href={linkedinProfile} target="blank" rel="noopener noreferrer">
        <img
          src={LiInLogo}
          alt="Linkedin Logo"
          className={styles.social_logos}
        /></a>
        <a href={githubProfile} target="blank" rel=" noopener noreferrer">
        <img
          src={GitHLogo}
          alt="Github Logo"
          className={styles.social_logos}
        /></a>
        <FaEnvelope  onClick={openModal} className={styles.contact_icon} />
        {showModal && <ContactModal closeModal={openModal}/> }

      </div>
    </footer>
  );
};

export default Footer;
