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



const review_url = '/api/business/opinion/review/trainer/list/'
const info_url = '/api/trainer/info/'
const paths = ['myschedule', 'myreview', 'myinfo']

const TrainerMyPage = (props) => {
    const {email, id} = useSelector((state) => state.etc);
    const [myInfo, setMyInfo] = useState(null);
    
    const [myReview, setMyReview] = useState([]);
    const [reviewPage, setReviewPage] = useState(0);
    const [url, setUrl] = useState(()=> {
        for(let i=0; i<paths.length; i++){
            if(window.location.pathname.endsWith(paths[i])){
                return paths[i]
            }
        }
    })
    useEffect(() => {
        switch (url) {
            case "myreview":
                if(!myReview.length){
                    axios.get(review_url+id+'/'+reviewPage).then((data)=> {setMyReview(data.data.content);setReviewPage(data.data.pageable.pageNumber)})
                    console.log('트레이너id의 0번째 페이지 리뷰 뽑아오기')
                }
                break;
            case "myschedule":
                console.log(url)
                break;
            case "myinfo":
                if(!myInfo){
                    axios.get(info_url+email).then((data)=> {setMyInfo(data.data)})
                    console.log('인포 없어서 받기')
                    console.log(myInfo)
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
                    <MyPageProfile/>
                    <TrainerMyPageMenu id='my_page_menu' url={url} setUrl={setUrl}/>
                </div>
                <Routes>
                    {myInfo && <Route path='/myinfo' element={<TrainerMyPageMyInfo myInfo={myInfo} setMyInfo={setMyInfo} />}/>}
                    <Route path='/myreview' element={<TrainerMyPageMyReview reviews={myReview}/>}/>
                    <Route path='/myschedule' element={<TrainerMyPageMySchedule />}/>
                </Routes>
            </div>
            <div>

            </div>


        </div>
    );
};

export default TrainerMyPage;