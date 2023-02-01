import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Home.module.css"
import TopTitle from '../../components/Common/TopTitle'
import TrainerCard from '../../components/Card/TrainerCard';

const Home = () => {
    
    return (
        <div className={styles.Home}>
            <TopTitle title='이달의 트레이너' content='MPTI를 빛낸 우수한 강사진을 확인하세요!'/>
            {/* 트레이너 리스트 부분 - 분리예정 */}
    
            <div className={styles.home_trainer_box}>
                <Link to={'/clienttrainerdetail'} ><TrainerCard/></Link>
            </div>
                
            <div className={styles.home_title}>MPTI의 리뷰</div> 
            <div className={styles.home_comment}>MPTI 고객님들의 생생한 후기를 확인해보세요!</div>
            <TopTitle title='MPTI의 리뷰' content='MPTI 고객님들의 생생한 후기를 확인해보세요!'/> 
 
        </div>
    );
};

export default Home;