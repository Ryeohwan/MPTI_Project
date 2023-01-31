import React from 'react';
import styles from "./Home.module.css"
import TrainerImg from "./../../assets/img/trainer.PNG"
import TopTitle from '../../components/Common/TopTitle'

const Home = () => {
    
    return (
        <div className={styles.Home}>
            <TopTitle title='이달의 트레이너' content='MPTI를 빛낸 우수한 강사진을 확인하세요!'/>
            {/* 트레이너 리스트 부분 - 분리예정 */}
     
            <div className={styles.home_trainer_box}>

                <ul className={styles.home_trainer_list}>
                  
                

                    <li className={styles.home_trainer_item}>
                            <div className={styles.home_trainer_img}><img src={TrainerImg}/></div>
                            <div className={styles.home_trainer_info}>
                                    <div>정원철 트레이너</div>
                                    <div>별점 5개 평점 4.86점</div>
                                    <div>이친구 정말 야무지게 가르쳐주네</div>
                            </div>
                    </li>

                    <li className={styles.home_trainer_item}>
                            <div className={styles.home_trainer_img}><img src={TrainerImg}/></div>
                            <div className={styles.home_trainer_info}>
                                    <div>정원철 트레이너</div>
                                    <div>별점 5개 평점 4.86점</div>
                                    <div>이친구 정말 야무지게 가르쳐주네</div>
                            </div>
                    </li>


                 
                    
                </ul>
                
            </div>
                
            <div className={styles.home_title}>MPTI의 리뷰</div> 
            <div className={styles.home_comment}>MPTI 고객님들의 생생한 후기를 확인해보세요!</div>
            <TopTitle title='MPTI의 리뷰' content='MPTI 고객님들의 생생한 후기를 확인해보세요!'/> 
 
        </div>
    );
};

export default Home;