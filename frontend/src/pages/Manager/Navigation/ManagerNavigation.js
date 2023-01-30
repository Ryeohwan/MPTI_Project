import React from 'react';
import styles from './ManagerNavigation.module.css'
const ManagerNavigation = () => {
    return (
        <div className={styles.info_nav_box}>
                    
        <div className={styles.nav_title}>메뉴</div>
        <ul className={styles.nav_item}>
            <li className={styles.nav_sign}><span className={styles.select_square1} >&#9654;</span>가입승인</li>
            <li className={styles.nav_report}><span className={styles.select_square2} >&#9654;</span>신고관리</li>
            <li className={styles.nav_account}><span className={styles.select_square3} >&#9654;</span>계정관리</li>
        </ul>
    </div>
    );
};

export default ManagerNavigation;