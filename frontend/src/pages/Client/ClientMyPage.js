import React from 'react';
import styles from './ClientMyPage.module.css'
import TopTitle from '../../components/Common/TopTitle'
import ClientMyPageProfile from '../../components/MyPage/ClientMyPageProfile';
import ClientMyPageMyInfo from '../../components/MyPage/ClientMyPageMyInfo';
const ClientMyPage = () => {
    return (
        <div className={styles.ClientMyPage}>
             <TopTitle title='마이페이지▼' content='회원님의 개인정보를 확인해보세요 !'/>
            <div className={styles.ClientMyPage_body}>
                <ClientMyPageProfile/>
                <div className={styles.ClientMyPage_body_content}>
                    <ClientMyPageMyInfo/>
                </div>
            </div>
        
        </div>
    );
};

export default ClientMyPage;