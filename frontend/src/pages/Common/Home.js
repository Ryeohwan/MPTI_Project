import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import smileImg from "../../assets/img/smile.png";
import { trainerListByStar, reviewList } from "../../store/etc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Home = () => {
  const dispatch = useDispatch();
  const { role } = useSelector((state) => state.auth);

  const [trainer, setTrainer] = useState([]);
  const [review, setReview] = useState([]);

  const starRate = (star) => {
    const elements = [];
    for (let i = 0; i < star; i++) {
      elements.push(
        <Icon
          key={i + 5}
          icon="openmoji:star"
          className={styles.star_icon}
        ></Icon>
      );
    }
    for (let i = 0; i < 5 - star; i++) {
      elements.push(
        <Icon
          key={i}
          icon="ic:round-star-border"
          className={styles.border_star_icon}
        ></Icon>
      );
    }
    return elements;
  };

  useEffect(() => {
    // 홈에서 트레이너 상위 0페이지 존재하는 트레이너 불러옴
    dispatch(trainerListByStar(0)).then((res) => {
      const trainerList = res;
      setTrainer(trainerList.slice(0, 4));
    });

    dispatch(reviewList(0)).then((res) => {
      const reviewList = res;
      setReview(reviewList.slice(0, 4));
    });
  }, []);

  console.log("렌더링 확인");
  return (
    <div className={styles.Home}>
      <div className={styles.home_header}>이달의 트레이너</div>
      <div className={styles.home_comment}>
        MPTI를 빛낸 우수한 강사진을 확인하세요!
      </div>

      {/* 트레이너 리스트 부분 - 분리예정 */}

      <div className={styles.home_trainer_box}>
        <ul className={styles.home_trainer_list} >

          {trainer.map((it, index) => {
            return (
              <Link to={`/${role}/trainerdetail`} state={it}>
                <li key={index} className={styles.home_trainer_item}>
                  <div className={styles.home_trainer_img}>
                    <img src={it.imageUrl} alt="" />
                  </div>
                  <div className={styles.home_trainer_info}>
                    <div className={styles.home_trainer_name}>
                      {it.name} 트레이너
                    </div>
                    <br></br>
                    <div className={styles.home_trainer_rate}>
                      <div>{starRate(it.stars)}</div>
                      <div className={styles.star_rate}>{it.stars}점</div>
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
          {review.map((it, index) => {
            console.log(it);
            return (
              <li key={index} className={styles.home_review_item}>
                <div className={styles.home_review_top}>
                  <div className={styles.home_review_img}>
                    <img src={smileImg} alt=""></img>
                  </div>
                  <div className={styles.home_review_name}>
                    {it.targetName}{" "}
                  </div>
                </div>

                <div className={styles.home_review_mid}>
                  <div className={styles.home_review_cusname}>
                    {it.writerName}
                  </div>
                  <div className={styles.home_review_start}>
                    {starRate(it.star)}{" "}
                  </div>
                </div>

                <div className={styles.home_review_bottom}>{it.memo}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
