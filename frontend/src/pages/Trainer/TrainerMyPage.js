import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './TrainerMyPage.module.css';
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import TrainerMyPageMenu from '../../components/MyPage/TrainerMyPageMenu';
import TrainerMyPageMyReview from './TrainerMyPageMyReview';
import TrainerMyPageMyInfo from './TrainerMyPageMyInfo'
import TrainerMyPageMySchedule from './TrainerMyPageMySchedule'
import {Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";


const request_url_review = '/api/business/opinion/review/list'
const request_url_info = '/api/trainer/info/'
const trainer_id = 'qwer@naver.com'
const paths = ['myschedule', 'myreview', 'myinfo']
const TrainerMyPage = (props) => {
    const {email} = useSelector((state) => state.etc);
    const [trainerInfo, setTrainerInfo] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [url, setUrl] = useState(()=> {
        for(let i=0; i<paths.length; i++){
            if(window.location.pathname.endsWith(paths[i])){
                return paths[i]
            }
        }
    })
    useEffect(() => {
        async function getReview(){
            const newReviews = await axios.get(request_url_review)
            setReviews(newReviews.data)
        }
        async function getInfo(){
            const newInfo =await axios.get(request_url_info+email)
            setTrainerInfo(newInfo.data)
        }
        switch (url) {
            case "myreview":
                if(!reviews.length){
                    getReview()
                    console.log('리뷰 없어서 받기')
                }
                break;
            case "myschedule":
                console.log(url)
                break;
            case "myinfo":
                if(!trainerInfo){
                    getInfo()
                    console.log('인포 없어서 받기')
                }
                break;
            default:
                break;
        }
    }, [url])


    return (
        <div className={styles.TrainerMyPage}>
                <TopTitle title='마이페이지▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 ! '/>
            <div className={styles.MyPage_body}>
                <div className={styles.left_body}>
                    <MyPageProfile name='정원철' role='트레이너'/>
                    <TrainerMyPageMenu id='my_page_menu' url={url} setUrl={setUrl}/>
                </div>
                <Routes>
                    <Route path='/myinfo' element={<TrainerMyPageMyInfo trainerInfo={trainerInfo} setTrainerInfo={setTrainerInfo} />}/>
                    <Route path='/myreview' element={<TrainerMyPageMyReview reviews={reviews}/>}/>
                    <Route path='/myschedule' element={<TrainerMyPageMySchedule />}/>
                </Routes>
            </div>
            <div>

            </div>


        </div>
    );
};

export default TrainerMyPage;