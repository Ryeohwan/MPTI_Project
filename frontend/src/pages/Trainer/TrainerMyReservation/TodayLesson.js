import React from 'react';
import styles from './TodayLesson.module.css'
import ScheduleCardItem2 from '../../../components/Card/ScheduleCardItem2';


const TrainerMyClient = (props) => {

    const data = props.signupList;
    console.log(data);

    return (
        <div className={styles.container}>
            {data.map(it=>{
                return <ScheduleCardItem2 key={it.id}  className={styles.item} {...it} />
            })}
        </div>
    );
};

export default TrainerMyClient;