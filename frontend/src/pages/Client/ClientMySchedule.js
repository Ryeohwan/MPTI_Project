import React, { useEffect, useState } from "react";
import styles from "./ClientMySchedule.module.css"
import ScheduleCardItem from "../../components/Card/ScheduleCardItem";
import TopTitle from '../../components/Common/TopTitle'
import axios from "axios";

function MySchedule() {
    const [schedule, setSchedule] =useState([]);
    const today = new Date().toLocaleString().split('.').slice(0,3).map((item)=> parseInt(item))
    console.log(today)
    console.log(schedule)
    useEffect(()=>{
        async function getSchedule(){
            const data = await axios.get('/api/business/reservation/1')
            setSchedule([data.data])
        }
        getSchedule()
    }, [])
    console.log(schedule)
    return (
        <div className={styles.schedule}>
            <TopTitle title='내 스케줄▼' content='고객님의 오늘 수업에 입장하고 예약 스케줄을 관리해보세요!'/>
            <div className={styles.schedule_menu}>오늘 수업</div>
            <ul className={styles.card_list_top}>
                {schedule.length!==0 && schedule.map((item, index) => item.year===today[0] && item.month === today[1] && item.day === today[2] && <ScheduleCardItem key={index} schedule={item} active={true}/>)}
            </ul>
            <div className={styles.schedule_menu}>예약한 스케줄</div>
            <ul className={styles.card_list_bottom}>
                {schedule.length!==0 && schedule.map((item, index) => !(item.year === today[0] && item.month === today[1] && item.day === today[2]) && <ScheduleCardItem key={index} schedule={item} active={false}/>)}
            </ul>
        </div>
    );
};

export default MySchedule;