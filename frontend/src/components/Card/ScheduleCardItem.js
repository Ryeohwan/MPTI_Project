import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ScheduleCardItem.module.css"
import { trainerDetail } from "../../store/etc";
function ScheduleCardItem({schedule, active}) {
  const dispatch = useDispatch()
  dispatch(trainerDetail)
  const {role, image} = useSelector((state)=>(state.auth))
console.log('ScheduleCardItem.js 고객페이지',schedule.trainerId, schedule.userId, schedule.trainerName, schedule.sessionId, schedule.userName)
  return (
    <li className={styles.card_item}>
      <img className={styles.card_item_img} src={image?image:'/profile_base.png'} alt='/profile_base.png'></img>
      <div className={styles.card_item_info}>
        <div className={styles.card_item_info_txt}>{schedule.trainerName}</div>
        <div>{schedule.year}.{schedule.month}.{schedule.day} {schedule.hour}:00 - {schedule.hour+1}:00</div>
      </div>
      {active?<button className={styles.button}>
          <Link to="/lesson" state={{trainerId:schedule.trainerId, clientId:schedule.userId, name:schedule.userName,sessionId:schedule.sessionId, clientName:schedule.userName, trainerName:schedule.trainerName, role:role, image:image}} >
          <div>입장</div>
          </Link>
        </button>
        :
        <button className={styles.button} disabled>
          <div>입장</div>
        </button>
      }
    </li>
  );
}

export default ScheduleCardItem;