import React from 'react';
import styles from './ClientMyReservation.module.css';
import TopTitle from '../../components/Common/TopTitle'
const ClientMyReservation = () => {
    return (
        <div className={styles.ClientMyReservation}>
            <TopTitle title='예약하기▼' content='여러분과 딱 맞는 트레이너를 찾아보세요!'/>
        </div>
    );
};

export default ClientMyReservation;