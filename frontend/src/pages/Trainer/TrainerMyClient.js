import React from 'react';
import styles from './TrainerMyClient.module.css';
import TopTitle from '../../components/Common/TopTitle'

const TrainerMyClient = () => {
    <TopTitle title='고객 관리' content='고객을 관리해 주세요.'/>
    return (
        <div className={styles.TrainerMyClient}>
            TrainerMyClient
        </div>
    );
};

export default TrainerMyClient;