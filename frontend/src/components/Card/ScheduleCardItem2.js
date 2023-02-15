import { Link } from "react-router-dom";
import styles from "./ScheduleCardItem2.module.css"

// 이 카드는 trainer가 나의 고객들 볼떄 사용.
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
          <div className={styles.card_item_info_txt}>{props.userName}</div>
          <div className={styles.card_item_info_txt}></div>
          <div>{props.year}.{props.month}.{props.day} {props.hour}시</div>
        </div>
        <button className={styles.button}><Link to="/lesson" state={{trainerId:props.trainerId, clientId:props.userId, name:props.trainerId,sessionId:props.sessionId, clientName:props.userName}}><div>입장</div></Link></button>
      </div>
    );
  }
  
  export default ScheduleCardItem2;
