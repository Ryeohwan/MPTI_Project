import React, { useState, useEffect } from 'react';
import styles from './TrainerMyPage.module.css';
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import TrainerMyPageMenu from '../../components/MyPage/TrainerMyPageMenu';
import TrainerMyPageMyReview from './TrainerMyPageMyReview';
import TrainerMyPageMyInfo from './TrainerMyPageMyInfo'
import TrainerMyPageMySchedule from './TrainerMyPageMySchedule'
import {Routes, Route} from 'react-router-dom';
import axios from 'axios';

const email = 'dnjscjf@naver.com'
const trainer_url = '/api/trainer/...'
const info_url = '/api/trainer/info/'
const review_url = '/api/business/opinion/review/trainer/list/'
const trainer_id = 1
const TrainerMyPage = (props) => {
    const paths = ['myschedule', 'myreview', 'myinfo']
    const [myInfo, setMyInfo] = useState(null);
    const [myReview, setMyReview] = useState(null);
    const [reviewPage, setReviewPage] = useState(0);
    const [url, setUrl] = useState(()=> {
        for(let i=0; i<paths.length; i++){
            if(window.location.pathname.endsWith(paths[i])){
                return paths[i]
            }
        }
    })
    useEffect(()=>{
        switch(url){
            case 'myinfo':
                if(!myInfo){
                    axios.get(info_url+email).then((data)=> {setMyInfo(data.data);console.log(data.data,123)})
                }
                break;
            case 'myreview':
                if(!myReview){
                    axios.get(review_url+trainer_id+'/'+reviewPage).then((data)=> {setMyReview(data.data);console.log(data.data)})
                }
                break;
            case 'myschedule':
                break;
            default:
                break;
        }
        
    },[url])

    return (
        <div className={styles.TrainerMyPage}>
                <TopTitle title='마이페이지▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 ! '/>
            <div className={styles.MyPage_body}>
                <div className={styles.left_body}>
                {myInfo && <MyPageProfile userInfo={myInfo}/>}
                    <TrainerMyPageMenu id='my_page_menu' url={url} setUrl={setUrl}/>
                </div>
                <Routes>
                    <Route path='/myinfo' element={<TrainerMyPageMyInfo myInfo={myInfo}/>}/>
                    <Route path='/myreview' element={<TrainerMyPageMyReview myReview={myReview}/>}/>
                    <Route path='/myschedule' element={<TrainerMyPageMySchedule/>}/>
                </Routes>
            </div>
            <div>

            </div>


        </div>
    );
};

export default TrainerMyPage;