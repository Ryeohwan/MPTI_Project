import React from "react";
import { format } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import styles from "./Calendar.module.css";
import CalendarSchedule from "./CalendarSchedule.js";

const CalendarCells = ({ currentMonth, selectedDate, onDateClick, click, newData }) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = format(day, "d");
      const copyday = day;
      const parsedDay = new Date(copyday);
      const formatDay = format(parsedDay, "yyyy-MM-dd");

      days.push(
        <div
          className={`${styles.bodyRowCol} ${
            !isSameMonth(day, monthStart)
              ? `${styles.bodyRowColNotValid}`
              : isSameDay(day, selectedDate) && click
              ? `${styles.bodyRowColSellect}`
              : format(currentMonth, "M") !== format(day, "M")
              ? `${styles.bodyRowColNotValid}`
              : `${styles.bodyRowColValid}`
          }`}
          key={formatDay}
          id={formatDay}
          onClick={
            format(currentMonth, "M") === format(copyday, "M")
              ? () => {
                  onDateClick(copyday);
                }
              : () => {}
          }
        >
          <div
            className={
              format(currentMonth, "M") !== format(day, "M")
                ? `${styles.bodyRowColNotValid}`
                : ""
            }
          >
            {formattedDate}
          </div>

          <div>
            {"2023-03-13" === formatDay  ? (
              <div className={styles.calendar_schedule}>
                <CalendarSchedule times={["12시 서유진"]} date={formatDay} />
                <CalendarSchedule times={["18시 류하은"]} date={formatDay} />
                <CalendarSchedule times={["19시 조현철"]} date={formatDay} />
              </div>
            ) : null}
            
          </div>
        </div>
      );
      day = addDays(day, 1);
    }
    rows.push(
      <div className={styles.bodyRow} key={day}>
        {days}
      </div>
    );
    days = [];
  }

  while (rows.length < 6) {
    for (let i = 0; i < 7; i++) {
      days.push(
        <div
          className={`${styles.bodyRowCol} ${styles.bodyRowColNotValid}`}
          key={i}
        >
          -
        </div>
      );
    }
    rows.push(
      <div className={styles.bodyRow} key={rows.length}>
        {days}
      </div>
    );
  }

  return <div className={styles.body}>{rows}</div>;
};

export default CalendarCells;
