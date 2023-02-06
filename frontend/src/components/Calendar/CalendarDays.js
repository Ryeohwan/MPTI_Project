import React from "react";
import styles from "./Calendar.module.css";

const CalendarDays = () => {
    const days = [];
    const date = ["일", "월", "화", "수", "목", "금", "토"];
  
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={styles.calendarDaysCol} key={i}>
          {date[i]}
        </div>
      );
    }
  
    return <div className={styles.calendarDays}>{days}</div>;
  };

export default CalendarDays;