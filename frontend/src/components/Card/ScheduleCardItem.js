import React from "react";
import styles from "./ScheduleCardItem.module.css"

function ScheduleCardItem() {
  return (
    <li className={styles.card_item}>
      <div className={styles.card_item_img}>사진</div>
      <div className={styles.card_item_info}>
        <div className={styles.card_item_info_txt}>정원철 트레이너</div>
        <div>14:00 - 15:00</div>
      </div>
      <button className={styles.button}>입장</button>
    </li>
  );
}

export default ScheduleCardItem;