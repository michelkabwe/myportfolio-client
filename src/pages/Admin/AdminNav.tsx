import React, { Dispatch, useState } from 'react'
import { FaHouseUser } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";
import PostPage  from './PostPage';
import styles from '../../styles/AdminNav.module.css'


interface ActiveTabCategory {
    activeTab:string;
    handleActiveTab:any;

}

const AdminNav: React.FC<ActiveTabCategory> = ({handleActiveTab, activeTab}) => {



    return (
        <div className={styles.admin_nav_container}>
            <div className={styles.admin_nav_wrapper}>
                <div
                    className={`${styles.nav_item_text} ${activeTab === 'dashboard' ? styles.activeTab : ''}`}
                    onClick={() => handleActiveTab('dashboard')}
                >
                    Dashboard
                </div>
                <FaHouseUser className={styles.nav_item_icon} />
            </div>

            <div className={styles.admin_nav_wrapper}>
                <div
                    className={`${styles.nav_item_text} ${activeTab === 'posts' ? styles.activeTab : ''}`}
                    onClick={() => handleActiveTab('posts')}
                >
                    Posts
                </div>
                <FaPencilAlt className={styles.nav_item_icon} />
            </div>
        </div>
    );
};


export default AdminNav