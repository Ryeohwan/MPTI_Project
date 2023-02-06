import { useState, useEffect } from "react";
import styles from "./TrainerMyPageMySchedule.module.css";
import Calendar from "../../components/Calendar/Calendar";
// import axios from 'axios'
const morning = [
  "06:00 ~ 07:00",
  "07:00 ~ 08:00",
  "08:00 ~ 09:00",
  "09:00 ~ 10:00",
  "10:00 ~ 11:00",
  "11:00 ~ 12:00",
];
const afternoon = [
  "12:00 ~ 13:00",
  "13:00 ~ 14:00",
  "14:00 ~ 15:00",
  "15:00 ~ 16:00",
  "16:00 ~ 17:00",
  "17:00 ~ 18:00",
  "18:00 ~ 19:00",
  "19:00 ~ 20:00",
  "20:00 ~ 21:00",
  "21:00 ~ 22:00",
  "22:00 ~ 23:00",
  "23:00 ~ 24:00",
];

const TrainerMyPageMySchedule = () => {
  const [edit, setEdit] = useState(false);
  const [click, setClick] = useState(false);
  // useEffect(() => {axios.get(`https://i8a803.p.ssafy.io/api/business/reservation/list`).then((res) => {
  //     console.log(res)
  // })}, [])
  const handleClick = () => {
    setClick(!click);
  };
  const time_array = [];

  return (
    <div className={styles.container}>
      <div className={styles.bigtxt}>스케줄 조정</div>
      <div className={styles.smtxt}>
        수업이 가능한 날짜와 시간을 선택하세요!
      </div>
      <div className={styles.out_box}>
        <div className={styles.in_box}>
          <Calendar />
        </div>
      </div>
      <div className={styles.out_box}>
        {/* 오전 테이블 */}
        <div className={styles.time_table}>
          <div className={styles.table_text}>오전</div>
          <div className={styles.times_box}>
            {morning.map((time) => (
              <div
                className={`${styles.time} ${
                  click ? `${styles.clicked_time}` : null
                }`}
                key={time}
                onClick={() => {
                  handleClick();
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
        {/* 오후 테이블 */}
        <div className={styles.time_table}>
          <div className={styles.table_text}>오후</div>
          <div className={styles.times_box}>
            {afternoon.map((time) => (
              <div className={styles.time} key={time}>
                {time}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.edit} onClick={() => setEdit(true)}>
          수정🖍
        </div>
      </div>
    </div>
  );
};

export default TrainerMyPageMySchedule;
