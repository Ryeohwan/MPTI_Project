import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CustomerHeader.module.css'
const CustomerHeader = () => {
    return (
        <div className={styles.CustomerHeader}>
       <div className={styles.head_logo}> <Link to="/">MPTI</Link></div>
       
        <div className={styles.head_menu}>
            <div className={styles.head_text}><Link to="/ClientMySchedule">내 스케줄</Link></div>
            <div className={styles.head_text}><Link to="/ClientMyLog">운동기록</Link></div>
            <div className={styles.head_text}><Link to="/ClientMyPage"> 프로필</Link></div>
            <div className={styles.head_text}><Link to="/ClientMyReservation">예약현황</Link></div>
        </div>

        </div>
    );
};

export default CustomerHeader;