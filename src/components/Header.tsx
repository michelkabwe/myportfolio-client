import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Header.module.css";
import NavBar from "./NavBar";
import NavResponsive from "./NavResponsive";
import { useCategoriesContext } from "../contexts/usePostProvider/usePostList";
import { useLocation } from 'react-router-dom';





type Auth = {
    isLoggedIn: boolean;
    isLoggedOut: boolean;
    setIsLoggedOut: React.Dispatch<React.SetStateAction<boolean>>
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}





const Header: React.FC<Auth> = ({ isLoggedIn, isLoggedOut, setIsLoggedOut, setIsLoggedIn }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const location = useLocation();
    const { posts, fetchPosts } = useCategoriesContext();

    const isSinglePost = useMemo(() => {
        if (!posts) return false;
        return posts.some(post => location.pathname === `/api/posts/${post.id}`);
    }, [posts, location.pathname]);

    const isProjectsPage = location.pathname === '/Projects';


  useEffect(() => {
    fetchPosts();
  },[])

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
                {!isLoggedIn ? <Link to="/">Michel Kabwe</Link> : (
                    <Link to="/AdminPage">Dashboard</Link> )
                }
            </span>
            <NavBar isLoggedIn={isLoggedIn} isLoggedOut={isLoggedOut} setIsLoggedOut={setIsLoggedOut} setIsLoggedIn={setIsLoggedIn} />
            <NavResponsive isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
};

export default Header;
