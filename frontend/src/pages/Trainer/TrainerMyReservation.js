import React, { useEffect } from 'react';
import styles from './TrainerMyReservation.module.css';
import TopTitle from '../../components/Common/TopTitle'
import TodayLesson from './TrainerMyReservation/TodayLesson'
import MySchedule from './TrainerMyReservation/MySchedule'
import Pagination from "react-js-pagination";
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import "../../pages/Manager/Paging.css"
const TrainerMyReservation = () => {
    const [pages, setPages]=useState(3);
    const [pageSelect, setPageSelect] = useState(1);
    const [tab, setTab] = useState('tab1')


    const [signupList, setSignupList] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage]= useState(0);
    const handlePageChange = (page) => {
      console.log(page);
      setPage(page);
    };
    const dispatch = useDispatch();
    //0206
    useEffect(()=>{
        axios.get(`/api/business/reservation/page/1/2023/2/7/${page-1}`).then((res)=>{
            console.log(res.data);
            setTotalPage(res.data.totalElements);
            setSignupList(res.data.content)
        })
    }, [page])

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
                        <TodayLesson signupList={signupList}/>
                    </div>
                    <input type='radio' name='show_menu' id='tab2' onChange={(e)=>setTab(e.target.id)}/>
                    <div className={styles.content}>
                        <MySchedule/>
                    </div>
                    
                </div>
            </div>
            {tab==='tab1' && <div className={styles.pagenation}>
          <Pagination
      activePage={page}
      itemsCountPerPage={7}
      totalItemsCount={totalPage}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
        </div>}

        </div>
    );
};

export default TrainerMyReservation;