import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import styles from './ClientMyPage.module.css'
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import ClientMyPageMyInfo from '../../components/MyPage/ClientMyPageMyInfo';
import ClientMyPageMyReview from '../../components/MyPage/ClientMyPageMyReview';
import axios from 'axios';
const infoUrl="/api/trainer/info"
const reviewUrl="/api/business/opinion/review/list"


const ClientMyPage = () => {
    const [info, setInfo] = useState(undefined)
    const [reviews, setReviews] = useState(undefined)
    const {email} = useSelector((state) => state.etc);
    useEffect(()=>{

        async function getInfo() {
            if(!info){
                console.log(email)
                console.log(`${infoUrl}/${email}`)
                const data = await axios.get(`${infoUrl}/${email}`)
                console.log(data)
                setInfo(data.data)
            }
        }

        async function getReview() {
            if(!reviews){
                const data = await axios.get(reviewUrl)
                setReviews(data.data)
            }
        }
        getInfo();
        getReview();
    },[])


    return (
        <div className={styles.ClientMyPage}>
             <TopTitle title='마이페이지▼' content='회원님의 개인정보를 확인해보세요 !'/>
            <div className={styles.ClientMyPage_body}>
                <MyPageProfile name='정원철' role='회원'/>
                <div className={styles.ClientMyPage_body_content}>
                    <div className={styles.content_title}>내 개인정보</div>
                    <ClientMyPageMyInfo info={info} setInfo={setInfo}/>
                    <div className={styles.content_title}>내가 쓴 리뷰</div>
                    <ClientMyPageMyReview  reviews={reviews}/>
                </div>
            </div>
        </div>
    );
};

export default ClientMyPage;