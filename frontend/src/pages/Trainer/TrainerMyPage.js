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

// 트레이너 review, info api
const request_url_review = '/api/business/opinion/review/trainer/list/'
const request_url_info = '/api/trainer/info/'
const paths = ['myschedule', 'myreview', 'myinfo']
const TrainerMyPage = (props) => {
    // 트레이너 email
    const {email} = useSelector((state) => state.etc);
    //트레이너 id
    const id =1
    // 트레이너 info
    const [trainerInfo, setTrainerInfo] = useState(undefined);
    // 트레이너 review
    const [reviews, setReviews] = useState([]);
    // 총 리뷰 페이지수
    const [pages, setPages] = useState(undefined)
    // 리뷰 페이지
    const [selectPage, setSelectPage] = useState(1)
    // 현재 클릭한 메뉴(url)
    const [url, setUrl] = useState(()=> {
        for(let i=0; i<paths.length; i++){
            if(window.location.pathname.endsWith(paths[i])){
                return paths[i]
            }
        }
    })
    useEffect(() => {
        async function getReview(){
            const newReviews = await axios.get(request_url_review+(id).toString()+'/'+(selectPage-1).toString())
            setReviews(newReviews.data.content)
            setPages(newReviews.data.totalElements)
        }
        async function getInfo(){
            const newInfo =await axios.get(request_url_info+email)
            setTrainerInfo(newInfo.data)
        }
        // url(선택한 메뉴)에 따라 받아오는 정보가 다르다.
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
                    {trainerInfo && <Route path='/myinfo' element={<TrainerMyPageMyInfo trainerInfo={trainerInfo} setTrainerInfo={setTrainerInfo} />}/>}
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