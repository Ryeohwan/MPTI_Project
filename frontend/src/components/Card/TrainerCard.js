import { useState,useEffect } from "react";
import styles from "./TrainerCard.module.css";
import { useSelector } from "react-redux";
import TrainerImg from "./../../assets/img/trainer.PNG";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const TrainerCard = (trainers) => {
  const [trainerList, setTrainerList] = useState(trainers.trainers);
  const {role}= useSelector((state) => state.auth);

  const starRate = (star) => {
    const elements = [];
    for (let i=0; i<star; i++) {
      elements.push(<Icon key={i+5} icon="openmoji:star" className={styles.star_icon}></Icon>)
    }
    for (let i=0; i<5-star; i++) {
      elements.push(<Icon key={i} icon="ic:round-star-border" className={styles.border_star_icon}></Icon>)
    }
    return elements
  }

  useEffect(()=>{
    setTrainerList(trainers.trainers);
  },[trainers.trainers]);
  
  return (
    <ul className={styles.trainer_list}>
      {trainerList.map((it) => {
        return (
          <Link to={`/${role}/trainerdetail`} state={it}>
            <li key={it.email} className={styles.trainer_item}>
              <div className={styles.trainer_img}>
                <img src={TrainerImg} alt="" />
              </div>
              <div className={styles.content_box2}>
              <div>{it.name} 트레이너</div>
              <br></br>
                <div className={styles.star_box}>
                  <div>별점: </div>
                  <div>
                    {starRate(it.stars)}
                  </div>
                  
                </div>
              </div>
            </li>
          </Link>
        );
      })}

 
    </ul>
  );
};

export default TrainerCard;