import { useState, useEffect, useRef } from "react";
import styles from "./TrainerMyPageMySchedule.module.css";
import Calendar from "../../components/Calendar/Calendar";
import axios from "axios";

const TrainerMyPageMySchedule = () => {
  const morning = [6, 7, 8, 9, 10, 11];
  const afternoon = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const [timeArray, setTimeArray] = useState([]);
  const [newDay, setNewDay] = useState([]);

  const getNewData = (data) => {
    console.log(data)
    setNewDay(data)
  }

  const getData = useRef([]);
  const newData = getData.current
    .map((item) => {
      if (
        item.year === newDay[0] &&
        item.month === newDay[1] &&
        item.day === newDay[2]
      ) {
        return item;
      }
      return false;
    })
    .filter(Boolean);
  console.log(getData)
  console.log(newData);

  useEffect(() => {
    axios.get("/api/business/reservation/list").then((res) => {
      getData.current = res.data;
    });
  }, []);

  const sendData = () => {
    const data = {
      // trainerId: {trainerId},

      hour: { timeArray },
    };
    axios.post("/api/business/reservation/scheduling", data).then((res) => {
      console.log(res);
    });
  };

  console.log(timeArray);

  return (
    <div className={styles.container}>
      <div className={styles.bigtxt}>스케줄 조정</div>
      <div className={styles.smtxt}>
        수업이 가능한 날짜와 시간을 선택하세요!
      </div>

      <div className={styles.out_box}>
        <div className={styles.in_box}>
          <Calendar getNewData={getNewData} />
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
                   timeArray.includes(time)
                    ? `${styles.clicked_time}`
                    : null
                }`}
                key={time}
                onClick={() => {
                  if (timeArray.includes(time)) {
                    let newTimeArray = timeArray.filter((ele) => ele !== time);
                    newTimeArray.sort(function (a, b) {
                      return a - b;
                    });
                    setTimeArray(newTimeArray);
                  } else {
                    setTimeArray((prev) =>
                      [...prev, time].sort(function (a, b) {
                        return a - b;
                      })
                    );
                  }
                }}
              >
                {time}시
              </div>
            ))}
          </div>
        </div>
        {/* 오후 테이블 */}
        <div className={styles.time_table}>
          <div className={styles.table_text}>오후</div>
          <div className={styles.times_box}>
            {afternoon.map((time) => (
              <div
                className={`${styles.time} ${
                   timeArray.includes(time)
                    ? `${styles.clicked_time}`
                    : null
                }`}
                key={time}
                onClick={() => {
                  if (timeArray.includes(time)) {
                    let newTimeArray = timeArray.filter((ele) => ele !== time);
                    newTimeArray.sort(function (a, b) {
                      return a - b;
                    });
                    setTimeArray(newTimeArray);
                  } else {
                    setTimeArray((prev) =>
                      [...prev, time].sort(function (a, b) {
                        return a - b;
                      })
                    );
                  }
                }}
              >
                {time}시
              </div>
            ))}
          </div>
        </div>
        <div className={styles.edit} onClick={sendData}>
          완료🖍
        </div>
      </div>
    </div>
  );
};

export default TrainerMyPageMySchedule;
