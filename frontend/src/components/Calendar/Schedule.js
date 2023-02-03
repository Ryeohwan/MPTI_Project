import React from "react";
import styles from "./Schedule.module.css";

const CalendarSchedule = (props) => {
    // props.date 콘솔 찍어보면 그 달 전일이 다 나옴......
  return (
      props.date === "2023-02-11" ? (
        <div className={styles.calendar_schedule}>{props.times}</div>
      ) : null
  );
};

export default CalendarSchedule;
