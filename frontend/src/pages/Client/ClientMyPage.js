import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styles from './ClientMyPage.module.css'
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import ClientMyPageMyInfo from '../../components/MyPage/ClientMyPageMyInfo';
import ClientMyPageMyReview from '../../components/MyPage/ClientMyPageMyReview';

const infoUrl="/api/user/info"
const reviewUrl="/api/business/opinion/review/list"



const email = 'asdf@naver.com'
const user_url ='/api/user/upload'
const info_url = '/api/user/info'
const review_url = '/api/business/opinion/review/user/list/'
const userId = 16
const ClientMyPage = () => {
    const [userInfo,setUserInfo] = useState(null);
    const [myReviews,setMyReview] = useState([]);
    const [page,setPage] = useState(0);
    
    useEffect(()=>{
        if(!userInfo){
            async function getMyReviews(userInfo){
                const data = await axios.post(review_url+userInfo.email+'/'+page).then(data => data.data)
                setMyReview(data)
                console.log(data)
            }

            async function getInfo(){
                const infoData = await axios.post(info_url,{email:email}).then(data => data.data)
                console.log(infoData)
                setUserInfo(infoData)
                getMyReviews(infoData)
            }
            console.log(111111)
            getInfo()
            console.log(22)
            }

    },[])
    console.log(userInfo,123)
    return (
        <div className={styles.ClientMyPage}>
             <TopTitle title='마이페이지▼' content='회원님의 개인정보를 확인해보세요 !'/>
            {userInfo && <div className={styles.ClientMyPage_body}>
                {<MyPageProfile userInfo={userInfo}/>}
                <div className={styles.ClientMyPage_body_content}>
                    <div className={styles.content_title}>내 개인정보</div>
                    <ClientMyPageMyInfo userInfo={{name:userInfo.name, gender:userInfo.gender, age:userInfo.age, email:userInfo.email,phone:userInfo.phone }} setUserInfo={setUserInfo}/>
                    <div className={styles.content_title}>내가 쓴 리뷰</div>
                    <ClientMyPageMyReview/>
                </div>
            </div>
            }
        </div>
    );
};

export default ClientMyPage;