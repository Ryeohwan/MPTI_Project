import React from 'react';
import styles from './CustomerHeader.module.css'
const CustomerHeader = () => {
    return (
        <div className={styles.CustomerHeader}>

        <div className={styles.head_logo}>MPTI</div>

        <div className={styles.head_menu}>
            <div className={styles.head_text}>내 스케줄</div>
            <div className={styles.head_text}>운동기록</div>
            <div className={styles.head_text}>예약하기</div>
            <div className={styles.head_message}>메시지</div>
            <div className={styles.head_profile}>프로필</div>
        </div>

        </div>
    );
};

export default CustomerHeader;