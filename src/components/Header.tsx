import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import NavBar from "./NavBar";
import NavResponsive from "./NavResponsive";
import { useCategoriesContext } from "../contexts/usePostProvider/usePostList";
import { useNavigate, useLocation, useParams } from 'react-router-dom';





type Auth = {
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}





const Header: React.FC<Auth> = ({ isLoggedIn, isLoggedOut, setIsLoggedOut, setIsLoggedIn }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { postId } = useParams();
    const { posts } = useCategoriesContext();

    const isSinglePost = posts.some(post => location.pathname === `/api/posts/${post.id}`);
    const isProjectsPage = location.pathname === '/Projects';

    return (
        <header
            className={`${styles.header} `}
            style={{
                background: isProjectsPage || isSinglePost ? '#350bde' : '#000000',
                position: isProjectsPage ? 'absolute' : 'fixed'
            }}
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
