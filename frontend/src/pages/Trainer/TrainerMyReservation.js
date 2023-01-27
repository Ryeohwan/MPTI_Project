import React from 'react';
import styles from './TrainerMyReservation.module.css';
import TopTitle from '../../components/Common/TopTitle'

const TrainerMyReservation = () => {
    <TopTitle title='예약현황' content='고객님의 운동기록을 확인하며 운동을 해보세요 ! '/>
    return (
        <div className={styles.TrainerMyReservation}>
            TrainerMyReservation
        </div>
    );
};

export default TrainerMyReservation;