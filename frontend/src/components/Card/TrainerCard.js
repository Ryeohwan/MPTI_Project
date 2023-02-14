import React from "react";
import { useState,useEffect } from "react";
import styles from "./TrainerCard.module.css";
import TrainerImg from "./../../assets/img/trainer.PNG";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
const TrainerCard = (trainers) => {
  const {role} = useSelector((state)=>state.auth)
  
  const [trainerList, setTrainerList] = useState(trainers.trainers);
  
  useEffect(()=>{
    setTrainerList(trainers.trainers);
  },[trainers.trainers]);
 
  return (
    <ul className={styles.trainer_list}>
      {trainerList && trainerList.map((it) => {
        return (
          <Link key={it.email} className={styles.trainer_item} to={`/${role}/trainerdetail`} state={it}>
              <div className={styles.trainer_img}>
              <img src={TrainerImg} alt="" />
            </div>
            <div className={styles.content_box2}>
            <div>{it.name} 트레이너</div>
            <br></br>
              <div className={styles.star_box}>
                <div>별점: </div>
                <div>
                  <Icon icon="ic:round-star" className={styles.star_icon}></Icon>{it.star}
                  <Icon icon="ic:round-star" className={styles.star_icon}></Icon>{it.star}
                  <Icon icon="ic:round-star" className={styles.star_icon}></Icon>{it.star}
                  <Icon icon="ic:round-star" className={styles.star_icon}></Icon>{it.star}
                  <Icon icon="ic:round-star" className={styles.star_icon}></Icon>{it.star}
                </div>
                
              </div>
            </div>
          </Link>
        );
      })}

 
    </ul>
  );
};

export default TrainerCard;
