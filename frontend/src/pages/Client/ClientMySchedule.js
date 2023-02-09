import React, { useEffect, useState } from "react";
import styles from "./ClientMySchedule.module.css"
import ScheduleCardItem from "../../components/Card/ScheduleCardItem";
import TopTitle from '../../components/Common/TopTitle'
import axios from "axios";
function MySchedule() {
    const [schedule, setSchedule] =useState([]);
    useEffect(()=>{
        async function getSchedule(){
            const data = await axios.get('/api/business/reservation/1')
            console.log(data)
            setSchedule([data.data])
        }
        getSchedule()
    }, [])
    

    return (
        <div className={styles.schedule}>
            <TopTitle title='내 스케줄▼' content='고객님의 오늘 수업에 입장하고 예약 스케줄을 관리해보세요!'/>
            <div className={styles.schedule_menu}>오늘 수업</div>
            <ul className={styles.card_list_top}>
                {schedule.length && schedule.map((item, index) => <ScheduleCardItem key={index} schedule={item}/>)}

            </ul>
            <div className={styles.schedule_menu}>예약한 스케줄</div>
            <ul className={styles.card_list_bottom}>
                {schedule.length && schedule.map((item, index) => <ScheduleCardItem key={index} schedule={item}/>)}
            </ul>
        </div>
    );
};

export default MySchedule;