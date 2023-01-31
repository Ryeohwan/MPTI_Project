import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ManagerNavigation.module.css'
const ManagerNavigation = () => {
    return (
        <div className={styles.info_nav_box}>
                    
        <div className={styles.nav_title}>메뉴</div>
        <ul className={styles.nav_item}>
            <li className={styles.nav_sign}><span className={styles.select_square1} >&#9654;</span><Link to={"/"}>가입승인</Link></li>
            <li className={styles.nav_report}><span className={styles.select_square2} >&#9654;</span><Link to={"/report"}>신고관리</Link></li>
            <li className={styles.nav_account}><span className={styles.select_square3} >&#9654;</span><Link to={"/account"}>계정관리</Link></li>
        </ul>
    </div>
    );
};

export default ManagerNavigation;