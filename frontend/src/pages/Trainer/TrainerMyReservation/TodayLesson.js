import React from 'react';
import styles from './TodayLesson.module.css'
import ScheduleCardItem2 from '../../../components/Card/ScheduleCardItem2';


const TrainerMyClient = () => {

    const data = {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'};

    return (
        <div className={styles.container}>
            <ScheduleCardItem2 className={styles.item} {...data} />
            <ScheduleCardItem2 className={styles.item} {...data} />
            <ScheduleCardItem2 className={styles.item} {...data} />
            <ScheduleCardItem2 className={styles.item} {...data} />
            <ScheduleCardItem2 className={styles.item} {...data} />
            <ScheduleCardItem2 className={styles.item} {...data} />
            <ScheduleCardItem2 className={styles.item} {...data} />
        </div>
    );
};

export default TrainerMyClient;