import React from "react";
import styles from "./Schedule.module.css";

const CalendarSchedule = (props) => {
  console.log(props.date)
  return <div className={styles.calendar_schedule}>{props.times}</div>;
};

export default CalendarSchedule;
