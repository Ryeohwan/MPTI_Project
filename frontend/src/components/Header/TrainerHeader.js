import React from 'react';
import styles from './TrainerHeader.module.css';
import { Link } from 'react-router-dom';

const TrainerHeader = () => {
    return (
        <div className={styles.TrainerHeader}>
        <div className={styles.head_logo}>MPTI</div>

        <div className={styles.head_menu}>

        <div className={styles.head_text}><Link to="/TrainerMyReservation">예약현황</Link></div>
            <div className={styles.head_text}><Link to="/TrainerMyClient">고객관리</Link></div>
            <div className={styles.head_text}><Link to="/TrainerMyPage"> 프로필</Link></div>
        </div>

        </div>
    );
};

export default TrainerHeader;