import React from 'react';
import styles from './TrainerMyReservation.module.css';
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import axios from 'axios';
const TrainerMyReservation = () => {

    return (
        <div className={styles.TrainerMyReservation}>
            <TopTitle title='예약현황▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 ! '/>
            <MyPageProfile name='정원철' role='트레이너'/>
        </div>
    );
};

export default TrainerMyReservation;