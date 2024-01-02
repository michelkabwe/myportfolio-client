import React, { useState } from 'react'
import AdminNav from '../pages/Admin/AdminNav';
import styles from '../styles/AdminPage.module.css';
import PostPage from './Admin/PostPage';
import Dashboard from './Admin/Dashboard';



const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard')


const handleActiveTab = (category:any) => {
    setActiveTab(category);

}
  return (
    <div className={styles.admin_dashboard_container}>
      <div className={styles.admin_dashboard_wrapper}>
        <div className={styles.admin_dashboard_col_left}>
          <AdminNav handleActiveTab={handleActiveTab} activeTab={activeTab}/>

        </div>
        <div className={styles.admin_dashboard_col_right}>
          <div className={styles.tab_content}>
          {activeTab === 'dashboard' ? <Dashboard /> : ''}

            {activeTab === 'posts' ? <PostPage /> : ''}
          </div>
        </div>

      </div>

    </div>
  )
}

export default AdminPage