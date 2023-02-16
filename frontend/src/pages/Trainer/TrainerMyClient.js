import React from 'react';
import styles from './TrainerMyClient.module.css';
import TopTitle from '../../components/Common/TopTitle';
import TrainerClientBody from './TrainerMyClient/TrainerClientBody';


const TrainerMyClient = () => {
    return (
        <div className={styles.TrainerMyClient}>
            <TopTitle title='고객 관리▼' content='소중한 귀하의 MPTI 고객들을 한눈에 관리해보세요.'/>
            <div className={styles.body_box}>
                <TrainerClientBody/>
            </div>
        </div>
    );
};

export default TrainerMyClient;