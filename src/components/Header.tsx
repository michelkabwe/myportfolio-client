import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Header.module.css";
import NavBar from "./NavBar";
import NavResponsive from "./NavResponsive";

interface Auth {
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Auth> = ({ isLoggedIn, isLoggedOut, setIsLoggedOut, setIsLoggedIn }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();
    const isProjectsPage = location.pathname === '/Projects';

    return (
        <header
            className={`${styles.header} ${isProjectsPage ? styles.about : ''}`}
            style={{ background: isProjectsPage ? '#350bde' : '#000000' }}
        >
            <span className={styles.logo}>
                {" "}
                <Link to="/">Michel Kabwe</Link>
            </span>
            <NavBar isLoggedIn={isLoggedIn} isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut} setIsLoggedIn={setIsLoggedIn} />
            <NavResponsive isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
};

export default Header;
