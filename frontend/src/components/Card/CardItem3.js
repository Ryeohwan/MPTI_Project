import styles from "./CardItem3.module.css"

function CardItem3(props) {
  const name = props.name;
  const gender = props.gender;
  const age = props.age;
  const time = props.time;
  const picture = props.picture;

    return (
      <div className={styles.card_item}>
        <img className={styles.card_item_img} src="/profilepic.png" alt="profile"></img>
        <div className={styles.card_item_info}>
          <div className={styles.card_item_info_txt}>성명</div>
          <div className={styles.card_item_info_txt}>성별/나이</div>
          <div className={styles.card_item_info_txt}>예약한 수업</div>
        </div>
        <div className={styles.card_item_info}>
          <div className={styles.card_item_info_txt}>{name}</div>
          <div className={styles.card_item_info_txt}>({gender}), {age}세</div>
          <div>{time}</div>
        </div>
        <button className={styles.button}>관리</button>
      </div>
    );
  }
  
  export default CardItem3;