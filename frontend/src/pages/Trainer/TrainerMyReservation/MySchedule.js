import React from 'react';
import styles from './MySchedule.module.css'
import Calendar from '../../../components/Calendar/Calendar';

const MySchedule = () => {

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <Calendar/>
            </div>
        </div>
    )


}



export default MySchedule