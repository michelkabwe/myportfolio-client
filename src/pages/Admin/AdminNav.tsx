import React from 'react'
import { FaHouseUser } from "react-icons/fa";
import { FaPencilAlt } from "react-icons/fa";

import styles from '../../styles/AdminNav.module.css'

const AdminNav = () => {
  return (
    <div className={styles.admin_nav_container}>
        <div className={styles.admin_nav_wrapper}>
            <p className={styles.nav_item_text}>Dashboard</p>
            <FaHouseUser className={styles.nav_item_icon}/>
        </div>
        <div className={styles.admin_nav_wrapper}>
            <p className={styles.nav_item_text}>Posts</p>
            <FaPencilAlt className={styles.nav_item_icon}/>
        </div>

    </div>
  )
}

export default AdminNav