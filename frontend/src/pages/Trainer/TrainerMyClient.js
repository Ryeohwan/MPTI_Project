import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TrainerMyClient.module.css';
import TopTitle from '../../components/Common/TopTitle';
import TrainerClientBody from './TrainerMyClient/TrainerClientBody';


const TrainerMyClient = () => {
    return (
        <div className={styles.TrainerMyClient}>
            <TopTitle title='고객 관리▼' content='고객을 관리해 주세요.'/>
            <div className={styles.body_box}>
                <TrainerClientBody/>
            </div>
        </div>
    );
};

export default TrainerMyClient;