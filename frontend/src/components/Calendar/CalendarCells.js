import React from "react";
import { format } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import styles from "./Calendar.module.css";
import CalendarSchedule from "./CalendarSchedule.js";

const CalendarCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  click,
  allData,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = "";
  console.log(allData)
  while (day <= endDate) {
    for (let i = 0; i < 7; i++) {
      formattedDate = parseInt(format(day, "d"));
      const copyday = day;
      const parsedDay = new Date(copyday);
      const formatDay = format(parsedDay, "yyyy-MM-dd");
      const intDate = formatDay.split("-").map((item) => parseInt(item));
    
      const reservedData = allData.filter((item) => item.year === intDate[0] && item.month === intDate[1] && item.day === intDate[2] && item.userId !== null)
      
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
            { reservedData.length !== 0 ? (
              <div>
                { reservedData.map((item) => <li key={item.id}><CalendarSchedule userName={item.userName} hour={item.hour}/></li>)}
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
