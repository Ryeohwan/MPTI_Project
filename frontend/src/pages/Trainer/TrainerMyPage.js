import React, { useEffect, useState } from 'react';
import styles from './TrainerMyPage.module.css';
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import TrainerMyPageMenu from './TrainerMyPage/TrainerMyPageMenu';
import TrainerMyPageMyReview from './TrainerMyPage/TrainerMyPageMyReview';
import TrainerMyPageMyInfo from './TrainerMyPage/TrainerMyPageMyInfo'
import TrainerMyPageMySchedule from './TrainerMyPage/TrainerMyPageMySchedule'
import {Routes, Route} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { trainerDetail, trainerReview } from '../../store/etc';


const paths = ['myschedule', 'myreview', 'myinfo']
const TrainerMyPage = (props) => {
    const dispatch = useDispatch();
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
                    dispatch(trainerReview(id,reviewPage)).then((data)=> {console.log(data);setMyReview(data.content);setReviewPage(data.pageable.pageNumber) })}
                break;
            case "myschedule":
                console.log(url)
                break;
            case "myinfo":
                if(!myInfo){
                    dispatch(trainerDetail(email)).then((res)=>setMyInfo(res))}
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
        </div>
    );
};

export default TrainerMyPage;