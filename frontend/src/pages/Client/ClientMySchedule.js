import React from "react";
import styles from "./ClientMySchedule.module.css"
import ScheduleCardItem from "../../components/Card/ScheduleCardItem";
import TopTitle from '../../components/Common/TopTitle'
function MySchedule() {
    const list = [{id:1}, {id:2}]
    return (
        <div className={styles.schedule}>
            <TopTitle title='내 스케줄▼' content='고객님의 오늘 수업에 입장하고 예약 스케줄을 관리해보세요!'/>

            <div className={styles.schedule_menu}>오늘 수업</div>

            <ul className={styles.card_list}>
                {list.map((item) => <ScheduleCardItem/>)}

            </ul>

            <div className={styles.schedule_menu}>예약한 스케줄</div>
           
            <ul className={styles.card_list}>
                {list.map((item) => <ScheduleCardItem/>)}
            </ul>
        </div>
    );
};

export default MySchedule;