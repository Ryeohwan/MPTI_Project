import React from 'react';
import styles from './TrainerMyReservation.module.css';
import TopTitle from '../../components/Common/TopTitle'
import TodayLesson from './TrainerMyReservation/TodayLesson'
import MySchedule from './TrainerMyReservation/MySchedule'
import Pagination from '../../components/Common/Pagination'
import { useState } from 'react';
const TrainerMyReservation = () => {
    const [pages, setPages]=useState(3);
    const [pageSelect, setPageSelect] = useState(1);
    const [tab, setTab] = useState('tab1')
    return (
        <div className={styles.TrainerMyReservation}>
            <TopTitle title='예약현황▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 ! '/>
            <div className={styles.body_box}>
                <div className={styles.tabs}>
                    <label className={styles.tab1} htmlFor='tab1'>오늘 수업</label>
                    <label className={styles.tab2} htmlFor='tab2'>내 스케줄</label>
                </div>

                <div>
                    <input type='radio' name='show_menu' id='tab1' onChange={(e)=>setTab(e.target.id)} defaultChecked/>
                    <div className={styles.content}>
                        <TodayLesson/>
                    </div>
                    <input type='radio' name='show_menu' id='tab2' onChange={(e)=>setTab(e.target.id)}/>
                    <div className={styles.content}>
                        <MySchedule/>
                    </div>
                    
                </div>
            </div>
            {tab==='tab1' && <Pagination pages={pages} select={pageSelect} setReviewPage={setPageSelect}/>}

        </div>
    );
};

export default TrainerMyReservation;