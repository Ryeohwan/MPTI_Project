import React, { useEffect } from 'react';
import styles from './TrainerMyReservation.module.css';
import TopTitle from '../../components/Common/TopTitle'
import TodayLesson from './TrainerMyReservation/TodayLesson'
import MySchedule from './TrainerMyReservation/MySchedule'
import Pagination from "react-js-pagination";
import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import "../../pages/Manager/Paging.css"
import { getTodayLesson } from '../../store/etc';
const TrainerMyReservation = () => {
    const {id} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const [tab, setTab] = useState('tab1')
    const [signupList, setSignupList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage]= useState(0);
    const handlePageChange = (page) => {
      setPage(page);
    };
    //0206
    useEffect(()=>{
        console.log(id)
        dispatch(getTodayLesson(id)).then((res) => { 
            // setTotalPage(res.totalElements);
            setSignupList(res)
        })
    }, [page])
    // useEffect(()=>{
    //     dispatch(getDaySchedule(id, new Date(), page)).then((res) => {
    //         console.log('오늘 스케줄',res)
    //         setTotalPage(res.totalElements);
    //         setSignupList(res.content)
    //     })
    // }, [page])

    return (
        <div className={styles.TrainerMyReservation}>
            <TopTitle title='예약현황▼' content='트레이너님의 스케줄을 확인하세요! '/>
            <div className={styles.body_box}>
                <div className={styles.tabs}>
                    <label className={styles.tab1} htmlFor='tab1'>오늘 수업</label>
                    <label className={styles.tab2} htmlFor='tab2'>내 스케줄</label>
                </div>

                <div>
                    <input type='radio' name='show_menu' id='tab1' onChange={(e)=>setTab(e.target.id)} defaultChecked/>
                    <div className={styles.content}>
                        <TodayLesson signupList={signupList}/>
                    </div>
                    <input type='radio' name='show_menu' id='tab2' onChange={(e)=>setTab(e.target.id)}/>
                    <div className={styles.content}>
                        <MySchedule/>
                    </div>
                    
                </div>
            </div>
            {tab==='tab1' && <div className={styles.pagenation}>
          {/* <Pagination
      activePage={page}
      itemsCountPerPage={7}
      totalItemsCount={totalPage}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    /> */}
        </div>}

        </div>
    );
};

export default TrainerMyReservation;