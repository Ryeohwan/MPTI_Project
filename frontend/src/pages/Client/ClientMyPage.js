import React from 'react';
import styles from './ClientMyPage.module.css'
import TopTitle from '../../components/Common/TopTitle'
const ClientMyPage = () => {
    return (
        <div className={styles.ClientMyPage}>
             <TopTitle title='마이페이지▼' content='회원님의 개인정보를 확인해보세요 !'/>
            <div className={styles.ClientMyPage_body}>
                <div className={styles.ClientMyPage_body_profile}>

                    <div className={styles.ClientMyPage_body_profile_box}>
                        <img className={styles.picture} src='/profilepic.png'></img>
                        <img className={styles.camera} src='/camera.png'></img>
                    </div>

                    <div className={styles.name}>정 원 철 <span className={styles.name2}>회원</span></div>
                </div>
                <div className={styles.ClientMyPage_body_content}>
                    개인정보
                </div>
            </div>
        
        </div>
    );
};

export default ClientMyPage;