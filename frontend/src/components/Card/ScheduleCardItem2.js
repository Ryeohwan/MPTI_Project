import styles from "./ScheduleCardItem2.module.css"

function ScheduleCardItem2() {
    return (
      <div className={styles.card_item}>
        <img className={styles.card_item_img} src="/profilepic.png" alt="profile"></img>
        <div className={styles.card_item_info}>
          <div className={styles.card_item_info_txt}>정원철 트레이너</div>
          <div>14:00 - 15:00</div>
        </div>
        <button className={styles.button}>입장</button>
      </div>
    );
  }
  
  export default ScheduleCardItem2;