import React, {useState, useReducer} from 'react';
import styles from './ClientMyPage.module.css'
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import ClientMyPageMyInfo from './ClientMyPage/ClientMyPageMyInfo';
import ClientMyPageMyReview from './ClientMyPage/ClientMyPageMyReview';
import { useSelector, useDispatch } from 'react-redux';
import { clientDetail, clientReview } from '../../store/etc';


const ClientMyPage = () => {

    const dispatch = useDispatch()
    const {email, id} = useSelector((state) => state.etc)
    const [myInfo, setMyInfo] = useState(undefined);
    const [myReviews, setMyReview] = useState([]);
    const [page, setPage] = useState(0);
    if(!myInfo){
        async function getData(){
            const reviewData = await dispatch(clientReview(id, page))
            const infoData = await dispatch(clientDetail(email))
            setMyInfo(infoData)
            setMyReview(reviewData.content)
        }
        getData()
    }

    return (
        <div className={styles.ClientMyPage}>
             <TopTitle title='마이페이지▼' content='회원님의 개인정보를 확인해보세요 !'/>
            <div className={styles.ClientMyPage_body}>
                <MyPageProfile/>
                <div className={styles.ClientMyPage_body_content}>
                    <div className={styles.content_title}>내 개인정보</div>
                    <ClientMyPageMyInfo myInfo={myInfo?{name:myInfo.name, gender:myInfo.gender, age:myInfo.age, email:myInfo.email,phone:myInfo.phone }:null} setMyInfo={setMyInfo}/>
                    <div className={styles.content_title}>내가 쓴 리뷰</div>
                    <ClientMyPageMyReview reviews={myReviews}/>
                </div>
            </div>
            
        </div>
    );
};

export default ClientMyPage;