import React from "react";
import styles from "./CalendarSchedule.module.css";

const CalendarSchedule = (props) => {
  return <div className={styles.calendar_schedule}>{props.times}</div>;
};

export default CalendarSchedule;
