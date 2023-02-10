import React, { useEffect, useState } from "react";
import styles from "./ClientMySchedule.module.css"
import ScheduleCardItem from "../../components/Card/ScheduleCardItem";
import TopTitle from '../../components/Common/TopTitle'
import { useSelector, useDispatch } from "react-redux";
import { clientSchedule } from "../../store/etc";

const MySchedule =()=> {
    const dispatch = useDispatch()
    // 고객 본인 아이디(api 요청에 사용)
    const {id} = useSelector((state) => state.etc)
    // 시간 표시용
    const [todaySchedule, setTodaySchedule] =useState([]);
    const [otherSchedule, setOtherSchedule] = useState([]);
    // today = [year,month,day]
    const today = new Date().toLocaleString().split('.').slice(0,3).map((item)=> parseInt(item))
    
    useEffect(()=>{
        async function getSchedule(){
            
            // 고객 스케줄표
            const data = await dispatch(clientSchedule(id))
            console.log(data)
            let temp_data1=[], temp_data2 = [];
            data.length && data.foreach((item, index) => {
                item.year === today[0] && 
                item.month === today[1] && 
                item.day === today[2]?
                // 오늘 수업이면 temp_data1으로 오늘 수업 아니면 temp_data2로
                temp_data1.push(item) : temp_data2.push(item)
            })
            setTodaySchedule(temp_data1)
            setOtherSchedule(temp_data2)
        }
        getSchedule()
    }, [])

    return (
        <div className={styles.schedule}>
            <TopTitle title='내 스케줄▼' content='고객님의 오늘 수업에 입장하고 예약 스케줄을 관리해보세요!'/>
            <div className={styles.schedule_menu}>오늘 수업</div>
            <ul className={styles.card_list_top}>
                {todaySchedule.length ? todaySchedule.map((item, index) => item.year===today[0] && item.month === today[1] && item.day === today[2] && <ScheduleCardItem key={index} schedule={item} active={true}/>) : <div>오늘 수업이 없습니다</div>}
            </ul>
            <div className={styles.schedule_menu}>예약한 스케줄</div>
            <ul className={styles.card_list_bottom}>
                {otherSchedule.length ? otherSchedule.map((item, index) => !(item.year === today[0] && item.month === today[1] && item.day === today[2]) && <ScheduleCardItem key={index} schedule={item} active={false}/>) : <div>수업을 예약해 주세요!!</div>}
            </ul>
        </div>
    );
};

export default MySchedule;