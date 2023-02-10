import React from "react";
import styles from "./CalendarSchedule.module.css";

const CalendarSchedule = (props) => {
  return <div className={styles.calendar_schedule}>{props.hour}시 {props.userName}</div>;
};

export default CalendarSchedule;
