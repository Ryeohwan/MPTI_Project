import React from "react";
import styles from "./TrainerCard.module.css"
import TrainerImg from "./../../assets/img/trainer.PNG"

const TrainerCard = () => {

  return (
    <ul className={styles.trainer_list}>
      <li className={styles.trainer_item}>
        <div className={styles.trainer_img}>
          <img src={TrainerImg} alt=""/>
        </div>
        <div className={styles.trainer_info}>
          <div>정원철 트레이너</div>
          <div>별점 5개 평점 4.86점</div>
          <div>이친구 정말 야무지게 가르쳐주네</div>
        </div>
      </li>

      <li className={styles.trainer_item}>
        <div className={styles.trainer_img}>
          <img src={TrainerImg} alt=""/>
        </div>
        <div className={styles.trainer_info}>
          <div>정원철 트레이너</div>
          <div>별점 5개 평점 4.86점</div>
          <div>이친구 정말 야무지게 가르쳐주네</div>
        </div>
      </li>
    </ul>
  );
};

export default TrainerCard;