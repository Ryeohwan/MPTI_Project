import React from 'react';
import styles from './TrainerHeader.module.css';
const TrainerHeader = () => {
    return (
        <div className={styles.TrainerHeader}>

        <div className={styles.head_logo}>MPTI</div>

        <div className={styles.head_menu}>
            <div className={styles.head_text}>예약현황</div>
            <div className={styles.head_text}>고객관리</div>
            {/* <div className={styles.head_message}>@</div>
            <div className={styles.head_profile}>@</div> */}
        </div>

        </div>
    );
};

export default TrainerHeader;