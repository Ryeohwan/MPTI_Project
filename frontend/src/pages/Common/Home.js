import React from 'react';
import styles from "./Home.module.css"
const Home = () => {
    return (
        <div className={styles.Home}>
           <div className={styles.home_header}>이달의 트레이너</div>
           <div className={styles.home_comment}>MPTI를 빛낸 우수한 강사진을 확인하세요!</div>
            <div className={styles.home_trainer}>트레이너 리스트 예정</div>
            
           <div className={styles.home_review}>MPTI의 리뷰</div> 
        </div>
    );
};

export default Home;