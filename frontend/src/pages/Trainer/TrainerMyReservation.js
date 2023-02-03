import React from 'react';
import styles from './TrainerMyReservation.module.css';
import TopTitle from '../../components/Common/TopTitle'
import TodayLesson from './TrainerMyReservation/TodayLesson'
const TrainerMyReservation = () => {

    return (
        <div className={styles.TrainerMyReservation}>
            <TopTitle title='예약현황▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 ! '/>
            <div className={styles.body_box}>
                <div className={styles.body_top_box}>
                    <div className={styles.top_menu1}>오늘 수업</div> <div className={styles.top_menu2}>내 스케줄</div>
                </div>
                <TodayLesson/>
            </div>
        </div>
    );
};

export default TrainerMyReservation;