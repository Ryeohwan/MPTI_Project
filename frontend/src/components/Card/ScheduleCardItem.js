import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./ScheduleCardItem.module.css";
import { trainerDetail } from "../../store/etc";
import axios from "axios";

function ScheduleCardItem({
  schedule,
  active,
  userId,
  reservationId,
  setClick
}) {
  
  const dispatch = useDispatch();
  dispatch(trainerDetail);

  const clickCancel = () => {
    axios
      .post("/api/business/reservation/cancel", {
        id: reservationId,
        userId: userId,
      })
      .then((res) => {
        console.log(res);
        setClick((prev) => !prev)
      });
  
  };

  const {role, image, name} = useSelector((state)=>(state.auth))
  console.log(schedule.trainerId)
  const trainerImg = schedule.imageUrl
  return (
    <li
      className={active ? `${styles.card_today_item}` : `${styles.card_item}`}
    >
      <img
        className={styles.card_item_img}
        src={trainerImg ? trainerImg : "/profile_base.png"}
        alt="/profile_base.png"
      ></img>
      <div className={styles.card_item_info}>
        <div className={styles.card_item_info_txt}>{schedule.trainerName}</div>
        <div>
          {schedule.year}.{schedule.month}.{schedule.day} {schedule.hour}:00 -{" "}
          {schedule.hour + 1}:00
        </div>
      </div>
      {active ? (
        <button className={styles.button}>
          <Link
            to="/lesson"
            state={{
              trainerId: schedule.trainerId,
              clientId: schedule.userId,
              name: schedule.userName,
              sessionId: schedule.sessionId,
              clientName: schedule.userName,
              trainerName: schedule.trainerName,
              role: role,
              image: image,
            }}
          >
            <div>입장</div>
          </Link>
        </button>
      ) : (
        <div className={styles.btn_wrapper}>
          <div className={styles.cancel_btn} onClick={() => clickCancel()}>
            <div>취소</div>
          </div>
        </div>
      )}
    </li>
  );
}
export default ScheduleCardItem;
