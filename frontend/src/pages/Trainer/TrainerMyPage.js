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

<<<<<<< HEAD


const review_url = '/api/business/opinion/review/trainer/list/'
const info_url = '/api/trainer/info/'
=======
// 트레이너 review, info api
const request_url_review = '/api/business/opinion/review/trainer/list/'
const request_url_info = '/api/trainer/info/'
>>>>>>> 3f985f2bdecff38d9e098d6c6af5101e040ad38a
const paths = ['myschedule', 'myreview', 'myinfo']

const TrainerMyPage = (props) => {
<<<<<<< HEAD
    const {email, id} = useSelector((state) => state.etc);
    const [myInfo, setMyInfo] = useState(null);
    
    const [myReview, setMyReview] = useState([]);
    const [reviewPage, setReviewPage] = useState(0);
=======
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
>>>>>>> 3f985f2bdecff38d9e098d6c6af5101e040ad38a
    const [url, setUrl] = useState(()=> {
        for(let i=0; i<paths.length; i++){
            if(window.location.pathname.endsWith(paths[i])){
                return paths[i]
            }
        }
    })
    useEffect(() => {
<<<<<<< HEAD
=======
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
>>>>>>> 3f985f2bdecff38d9e098d6c6af5101e040ad38a
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
<<<<<<< HEAD
                    {myInfo && <Route path='/myinfo' element={<TrainerMyPageMyInfo myInfo={myInfo} setMyInfo={setMyInfo} />}/>}
                    <Route path='/myreview' element={<TrainerMyPageMyReview reviews={myReview}/>}/>
=======
                    {trainerInfo && <Route path='/myinfo' element={<TrainerMyPageMyInfo trainerInfo={trainerInfo} setTrainerInfo={setTrainerInfo} />}/>}
                    <Route path='/myreview' element={<TrainerMyPageMyReview reviews={reviews}/>}/>
>>>>>>> 3f985f2bdecff38d9e098d6c6af5101e040ad38a
                    <Route path='/myschedule' element={<TrainerMyPageMySchedule />}/>
                </Routes>
            </div>
            <div>

            </div>


        </div>
    );
};

export default TrainerMyPage;