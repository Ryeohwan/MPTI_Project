import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './ClientMyPage.module.css'
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import ClientMyPageMyInfo from '../../components/MyPage/ClientMyPageMyInfo';
import ClientMyPageMyReview from '../../components/MyPage/ClientMyPageMyReview';
import { useSelector } from 'react-redux';

const info_url = '/api/user/info'
const review_url = '/api/business/opinion/review/user/list/'
const ClientMyPage = () => {
    const {email, id} = useSelector((state) => state.etc)
    const [myInfo, setMyInfo] = useState(null);
    const [myReviews, setMyReview] = useState([]);
    const [page,setPage] = useState(0);
    

    if(!myInfo){
        async function getMyReviews(myInfo){
            console.log(review_url+id+'/'+page)
            const data = await axios.get(review_url+id+'/'+page).then(data => data.data)
            setMyReview(data.content)
        }

        async function getInfo(){
            const infoData = await axios.post(info_url,{email:email}).then(data => data.data)
            console.log(infoData,111)
            setMyInfo(infoData)
            getMyReviews(infoData)
        }
        console.log(111111)
        getInfo()
        console.log(22)
        }

    
    return (
        <div className={styles.ClientMyPage}>
             <TopTitle title='마이페이지▼' content='회원님의 개인정보를 확인해보세요 !'/>
            <div className={styles.ClientMyPage_body}>
                <MyPageProfile/>
                <div className={styles.ClientMyPage_body_content}>
                    <div className={styles.content_title}>내 개인정보</div>
                    {myInfo && <ClientMyPageMyInfo myInfo={{name:myInfo.name, gender:myInfo.gender, age:myInfo.age, email:myInfo.email,phone:myInfo.phone }} setMyInfo={setMyInfo}/>}
                    <div className={styles.content_title}>내가 쓴 리뷰</div>
                    <ClientMyPageMyReview reviews={myReviews}/>
                </div>
            </div>
            
        </div>
    );
};

export default ClientMyPage;