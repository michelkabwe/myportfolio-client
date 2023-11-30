import React, { useState } from "react";
import { Link , useLocation} from "react-router-dom";
import styles from "../styles/Header.module.css";
import NavBar from "./NavBar";
import NavResponsive from "./NavResponsive";

const Header: React.FC = () => {
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
            <NavBar />
            <NavResponsive isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
};

export default Header;
