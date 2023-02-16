import React from 'react';
import styles from './TodayLesson.module.css'
import ScheduleCardItem2 from '../../../components/Card/ScheduleCardItem2';
import { useEffect, useState } from 'react';


const TrainerMyClient = (props) => {
    const today = new Date();
    const [data, setData] = useState([])

    useEffect(() =>{
        const getTodayLesson=async()=> {
            const response = await props.signupList.filter((item) => item.year===today.getFullYear() && item.month === (today.getMonth()+1) && item.day === today.getDate());
            setData(response)
        }
        getTodayLesson()
    },[props.signupList])

    return (
        <div className={styles.container}>
            {data.length!==0 && data.map(it=>{
                return <ScheduleCardItem2 key={it.id}  className={styles.item} {...it} />
            })}
        </div>
    );
};

export default TrainerMyClient;