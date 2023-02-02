import React from 'react';
import styles from './ManagerHeader.module.css';
const ManagerHeader = () => {

    const logoutHandler= ()=>{
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
    }

    return (
        <div className={styles.header_box}>
        <div className={styles.logo}>MPTI</div>
        <div  className={styles.statebar}>
            <div className={styles.statebar_comment}>Management Warehouse</div>
            <div className={styles.statebar_logout} onClick={logoutHandler}>LOGOUT</div>
        </div>
    </div>
    );
};

export default ManagerHeader;