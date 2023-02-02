import React from 'react';
import styles from './ClientMyPage.module.css'
import TopTitle from '../../components/Common/TopTitle'
import MyPageProfile from '../../components/MyPage/MyPageProfile';
import ClientMyPageMyInfo from '../../components/MyPage/ClientMyPageMyInfo';
import ClientMyPageMyReview from '../../components/MyPage/ClientMyPageMyReview';

const ClientMyPage = () => {
    return (
        <div className={styles.ClientMyPage}>
             <TopTitle title='마이페이지▼' content='회원님의 개인정보를 확인해보세요 !'/>
            <div className={styles.ClientMyPage_body}>
                <MyPageProfile name='정원철' role='회원'/>
                <div className={styles.ClientMyPage_body_content}>
                    <div className={styles.content_title}>내 개인정보</div>
                    <ClientMyPageMyInfo/>
                    <div className={styles.content_title}>내가 쓴 리뷰</div>
                    <ClientMyPageMyReview/>
                </div>
            </div>
        </div>
    );
};

export default ClientMyPage;