import React from "react";
import styles from "./ScheduleCardItem.module.css"

function ScheduleCardItem({schedule}) {
  console.log(schedule)
  function enterRoom() {
    console.log(schedule.sessionId)
  }
  return (
    <li className={styles.card_item}>
      <div className={styles.card_item_img}>사진</div>
      <div className={styles.card_item_info}>
        <div className={styles.card_item_info_txt}>{schedule.trainerName}</div>
        <div>{schedule.year}.{schedule.month}.{schedule.day} {schedule.hour}:00 - {schedule.hour+1}:00</div>
      </div>
      <button className={styles.button} onClick={()=>{enterRoom()}}>입장</button>
    </li>
  );
}

export default ScheduleCardItem;