import React, { useEffect, useState, useRef } from 'react';
import styles from './TrainerMyPage.module.css';
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/Common/MyPageProfile';
import TrainerMyPageMenu from '../../components/MyPage/TrainerMyPageMenu';
import TrainerMyPageMyReview from './TrainerMyPageMyReview';
import TrainerMyPageMyInfo from './TrainerMyPageMyInfo'
import TrainerMyPageMySchedule from './TrainerMyPageMySchedule'
import {Routes, Route} from 'react-router-dom';
const TrainerMyPage = (props) => {
    const paths = ['myschedule', 'myreview', 'myinfo']
    const [url, setUrl] = useState(window.location.pathname)
    useEffect(()=>{
        paths.some((path) => 
        {
            if(url.endsWith(path)){
                setUrl(path)
                return true;
            }
            return false;
        })
    }
    ,[])

    return (
        <div className={styles.TrainerMyPage}>
                <TopTitle title='마이페이지▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 ! '/>
            <div className={styles.MyPage_body}>
                <div className={styles.left_body}>
                    <MyPageProfile name='정원철' role='트레이너'/>
                    <TrainerMyPageMenu id='my_page_menu' url={url} setUrl={setUrl}/>
                </div>

                <Routes>
                    <Route path='/myinfo' element={<TrainerMyPageMyInfo/>}/>
                    <Route path='/myreview' element={<TrainerMyPageMyReview/>}/>
                    <Route path='/myschedule' element={<TrainerMyPageMySchedule/>}/>
                </Routes>
            </div>
            <div>

            </div>


        </div>
    );
};

export default TrainerMyPage;