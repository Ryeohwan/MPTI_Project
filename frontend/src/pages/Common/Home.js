import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import TrainerImg from "./../../assets/img/trainer.PNG";
import Star from "./../../assets/img/star.png";
import { trainerListByStar, reviewList } from "../../store/etc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BasicLoadingSpinner } from "./../../components/Loading/BasicLoadingSpinner";
const Home = () => {
  const dispatch = useDispatch();
  const {isLoading} = useSelector((state) => state.etc);
  const [trainer, setTrainer] = useState([]);
  const [review, setReview] = useState([]);
  const [role, setrole] = useState('client')
  //console.log(isLoading);
  //console.log(isLoading)
  useEffect(() => {
    // 홈에서 트레이너 상위 0페이지 존재하는 트레이너 불러옴
    dispatch(trainerListByStar(0)).then((res) => {
      const trainerList = res;
      //console.log(trainerList[0]);
      setTrainer(trainerList.slice(0,4));
    });

    dispatch(reviewList(0)).then((res) => {
      const reviewList = res;
      // console.log(reviewList);
      setReview(reviewList.slice(0,4));
    });


  }, []);

  return (
    <div className={styles.Home}>
     
      
      <div className={styles.home_header}>이달의 트레이너</div>
      <div className={styles.home_comment}>
        MPTI를 빛낸 우수한 강사진을 확인하세요!
      </div>
  
  
      

      {/* 트레이너 리스트 부분 - 분리예정 */}

      <div className={styles.home_trainer_box}>
        <ul className={styles.home_trainer_list}>
          {trainer.map((it) => {
            return (
              <Link to={`/${role}/trainerdetail`} state={it}>
                <li key={it.email} className={styles.home_trainer_item}>
                  <div className={styles.home_trainer_img}>
                    <img src={TrainerImg} />
                  </div>
                  <div className={styles.home_trainer_info}>
                    <div className={styles.home_trainer_name}>
                      {it.name} 트레이너
                    </div>
                    <div className={styles.home_trainer_rate}>
                      <span>★★★★★</span> {it.stars}점{" "}
                    </div>
                    <div className={styles.home_trainer_introduce}>
                      {it.birthday}
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      <div className={styles.home_title}>MPTI의 리뷰</div>
      <div className={styles.home_comment}>
        MPTI 고객님들의 생생한 후기를 확인해보세요!
      </div>

      <div className={styles.home_review_box}>
        <ul className={styles.home_review_list}>
          {review.map((it) => {
            return (
              <li key={it.id} className={styles.home_review_item}>
                <div className={styles.home_review_top}>
                  <div className={styles.home_review_img}>
                    <img src={TrainerImg} />
                  </div>
                  <div className={styles.home_review_name}>{it.targetName} </div>
                </div>

                <div className={styles.home_review_mid}>
                  <div className={styles.home_review_cusname}>{it.writerName}</div>
                  <div className={styles.home_review_start}>★★★★★ </div>
                </div>

                <div className={styles.home_review_bottom}>
                {it.memo}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      
      
     
    </div>
  );
};

export default Home;
