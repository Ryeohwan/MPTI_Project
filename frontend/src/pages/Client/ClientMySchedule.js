import React, { useEffect, useState } from "react";
import styles from "./ClientMySchedule.module.css";
import ScheduleCardItem from "../../components/Card/ScheduleCardItem";
import TopTitle from "../../components/Common/TopTitle";
import { useSelector, useDispatch } from "react-redux";
import { clientSchedule } from "../../store/etc";

const MySchedule = () => {
  const dispatch = useDispatch();
  // 고객 본인 아이디(api 요청에 사용)
  const { id } = useSelector((state) => state.auth);
  // 시간 표시용
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [otherSchedule, setOtherSchedule] = useState([]);
  const [click, setClick] = useState(true)

  // today = [year,month,day]
  const today = parseInt(
    new Date()
      .toLocaleString()
      .split(". ")
      .slice(0, 3)
      .reduce(
        (prev, next) => (next.length < 2 ? prev + "0" + next : prev + next),
        ""
      )
  );

  async function getSchedule() {
    // 고객 스케줄표
    const data = await dispatch(clientSchedule(id));
    // 1번=오늘 수업, 2번=미래 수업, 3번=과거수업
    let temp_data1 = [],
      temp_data2 = [],
      temp_data3 = [];
    data.length &&
      data.map((item) => {
        const lessonDay = parseInt(
          item.year.toString() +
            (item.month < 10 ? "0" + item.month : item.month) +
            (item.day < 10 ? "0" + item.day : item.day)
        );
        console.log(lessonDay, today);
        lessonDay >= today
          ? lessonDay === today
            ? temp_data1.push(item)
            : temp_data2.push(item)
          : temp_data3.push(item);
        return null;
      });
    console.log(
      "오늘:",
      temp_data1,
      "이후수업:",
      temp_data2,
      "끝난 수업:",
      temp_data3
    );
    setTodaySchedule(temp_data1);
    setOtherSchedule(temp_data2);
  }

  useEffect(() => {
    getSchedule();
  }, []);

  useEffect(() => {
    getSchedule();
  }, [click]);



  return (
    <div className={styles.schedule}>
      <TopTitle
        title="내 스케줄▼"
        content="고객님의 오늘 수업에 입장하고 예약 스케줄을 관리해보세요!"
      />
      <div className={styles.schedule_menu}>오늘 수업</div>
      <ul className={styles.card_list_top}>
        {todaySchedule.length ? (
          todaySchedule.map((item, index) => (
            <ScheduleCardItem key={index} schedule={item} active={true}  userId={id} reservationId={item.id}/>
          ))
        ) : (
          <div>오늘 수업이 없습니다</div>
        )}
      </ul>
      <div className={styles.schedule_menu}>예약한 스케줄</div>

      <div className={styles.schedule_wrapper}>
        <ul className={styles.card_list_bottom}>
          {otherSchedule.length ? (
            otherSchedule.map((item, index) => (
              <ScheduleCardItem key={index} schedule={item} active={false} userId={id} reservationId={item.id} setClick={setClick}/>
            ))
          ) : (
            <div>수업을 예약해 주세요!!</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MySchedule;
