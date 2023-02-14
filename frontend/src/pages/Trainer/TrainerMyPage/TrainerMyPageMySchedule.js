import { useState, useEffect } from "react";
import { format } from "date-fns";
import styles from "./TrainerMyPageMySchedule.module.css";
import Calendar from "../../../components/Calendar/Calendar";
import axios from "axios";


const TrainerMyPageMySchedule = () => {
  const morning = [6, 7, 8, 9, 10, 11];
  const afternoon = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const formatToday = format(new Date(), "yyyy-MM-dd");
  const intFormatToday = formatToday.split("-").map((item) => parseInt(item));

  const [allData, setAllData] = useState([]);                             // get으로 처음 가져온 모든 데이터(예약된 거 + 안 된 거)
  const [reservedHour, setReservedHour] = useState([]);                   // 클릭한 날짜의 가능 레슨 시간들 중 회원이 예약한 시간만 담은 데이터
  const [clickedDay, setClickedDay] = useState(intFormatToday);           // 캘린더에서 클릭한 날짜
  const [daySchedule, setDaySchedule] = useState([]);                     // 캘린더에서 클릭한 날짜의 데이터를 daySchedule에 저장
  const [timeArray, setTimeArray] = useState([]);                         // 이미 예약된 레슨 시간 + 내가 열어둔 레슨 시간
  const [click, setClick] = useState(false)

  const postClick = () => {
    setClick(!click)
  }
  
  // 수정 완료 버튼 누를 때(post)마다 재렌더링
  useEffect(() => {
    async function getReservation(){
      const data = await axios.get("/api/business/reservation/list");
      setAllData(data.data);
    };
    getReservation();
  }, [click])

  // # 캘린더에서 클릭한 날짜의 특정 스케쥴 받아온 clickedDaySchedule을 props로 올려받음
  async function getDaySchedule(intDate){
    const trainerId = 1;
    const data = await axios.get(`/api/business/reservation/list/${trainerId}/${intDate[0]}/${intDate[1]}/${intDate[2]}`);
    const clickedDaySchedule = data.data;
    console.log(clickedDaySchedule);
    setDaySchedule(clickedDaySchedule);
    setClickedDay(intDate);
    const myDayHours = clickedDaySchedule.map((item)=> item.hour)
    setTimeArray(myDayHours)
  }
  // daySchedule.filter() -> userId 있는 (예약된) 스케줄의 시간들, 오픈만 한 시간들 전부 timeArray에 담음
  useEffect(() => {
    if (daySchedule) {
      const reservedSchedule = daySchedule.filter((item) => item.userId !== null);
      const filterReservedHour = reservedSchedule.map((item) => item.hour)
      const everyHour = daySchedule.map((data) => data.hour);
      setTimeArray(everyHour)
      setReservedHour(filterReservedHour);                                            // 회원이 예약한 데이터 시간 배열
    }
  }, [daySchedule])


  // totalTimeArray : setTimeArray()에 담아 최종적으로 timeArray로 저장하고 싶은 배열 (예약O + 오픈O)
  // reservedHour : 회원이 예약을 한 시간(예약 O + 오픈 ㅇ)


  console.log("timeArray",timeArray)

  const handleClick = (event, time) => {
    if (reservedHour.includes(time)) {
      event.preventDefault()
    } else if (!reservedHour.includes(time) && timeArray.includes(time)) {  
      setTimeArray(timeArray.filter((item) => item !== time))
    } else if (!reservedHour.includes(time) && !timeArray.includes(time)) {
      setTimeArray((prev) => [...prev, time])
    }
  }

  useEffect(() => {
    async function getReservation(){
      const data = await axios.get("/api/business/reservation/list");
      setAllData(data.data);
    };
    getReservation();
  }, []);

  const sendData = () => {
    const data = {
      trainerId: 1,
      trainerName: "원쵸디",
      year: clickedDay[0],
      month: clickedDay[1],
      day: clickedDay[2],
      openHours: timeArray,
    };
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    axios.post("/api/business/reservation/scheduling", data, {headers: {"authorization": accessToken, "refresh-token": refreshToken}}).then((res) => {
      console.log(res);
    });
    axios.get("/api/business/reservation/list")
    };
    

  return (
    <div className={styles.container}>
      <div className={styles.bigtxt}>스케줄 조정</div>
      <div className={styles.smtxt}>
        수업이 가능한 날짜와 시간을 선택하세요!
      </div>

      <div className={styles.out_box}>
        <div className={styles.in_box}>
          <Calendar getDaySchedule={getDaySchedule} allData={allData}/>
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
                  timeArray.includes(time) ? `${styles.clicked_time}` : null
                } ${
                  reservedHour.includes(time) ? `${styles.prevent_clicked_time}` : null
                }`}
                key={time}
                onClick={(event) => {
                  handleClick(event, time);
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
                  timeArray.includes(time) ? `${styles.clicked_time}` : null
                } ${
                  reservedHour.includes(time) ? `${styles.prevent_clicked_time}` : null
                }`}
                key={time}
                onClick={(event) => {
                  handleClick(event, time);
                }}
              >
                {time}시
              </div>
            ))}
          </div>
        </div>
        <div className={styles.edit} onClick={() => {sendData();postClick();}}>완료🖍</div>
      </div>
    </div>
  );
};

export default TrainerMyPageMySchedule;