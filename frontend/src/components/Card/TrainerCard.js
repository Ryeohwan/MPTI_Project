import { useState,useEffect } from "react";
import styles from "./TrainerCard.module.css";
import TrainerImg from "./../../assets/img/trainer.PNG";

const TrainerCard = (trainers) => {
  const [trainerList, setTrainerList] = useState(trainers.trainers);

  useEffect(()=>{
    setTrainerList(trainers.trainers);
  },[trainers.trainers]);
 
  return (
    <ul className={styles.trainer_list}>
      {trainerList.map((it) => {
        return (
          <li key={it.email} className={styles.trainer_item}>
            <div className={styles.trainer_img}>
              <img src={TrainerImg} alt="" />
            </div>
            <div className={styles.trainer_info}>
              <div>{it.name} 트레이너</div>
              <div>별점 5개 평점 {it.star}점</div>
              <div></div>
            </div>
          </li>
        );
      })}

 
    </ul>
  );
};

export default TrainerCard;
