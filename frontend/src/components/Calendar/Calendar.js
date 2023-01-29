import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.css"

function ReservationCalendar() {
  const [value, onChange] = useState(new Date());
  return (
    <Calendar 
        onChange={onChange}
        value={value} 
        className={styles.custom_calendar }
        formatDay={(locale, date) =>
            date.toLocaleString('en', { day: 'numeric'})
        }
    />
  )
}

export default ReservationCalendar;