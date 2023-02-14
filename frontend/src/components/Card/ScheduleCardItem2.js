import styles from "./ScheduleCardItem2.module.css"

function ScheduleCardItem2(props) {

    return (
      <div className={styles.card_item}>
        <img className={styles.card_item_img} src="/profilepic.png" alt="profile"></img>
        <div className={styles.card_item_info}>
          <div className={styles.card_item_info_txt}>성명</div>
          <div className={styles.card_item_info_txt}>성별/나이</div>
          <div className={styles.card_item_info_txt}>예약한 수업</div>
        </div>
        <div className={styles.card_item_info}>
          <div className={styles.card_item_info_txt}>{props.trainerName}</div>
          <div className={styles.card_item_info_txt}>({"남"}), {props.month+12}세</div>
          <div>{props.year}.{props.month}.{props.day} {props.hour}pm</div>
        </div>
        <button className={styles.button}>입장</button>
      </div>
    );
  }
  
  export default ScheduleCardItem2;
