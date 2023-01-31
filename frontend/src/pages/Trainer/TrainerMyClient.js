import React from 'react';
import styles from './TrainerMyClient.module.css';
import TopTitle from '../../components/Common/TopTitle'

const TrainerMyClient = () => {
    return (
        <div className={styles.TrainerMyClient}>
            <TopTitle title='고객 관리▼' content='고객을 관리해 주세요.'/>
            TrainerMyClient
        </div>
    );
};

export default TrainerMyClient;