import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { format, addMonths, subMonths } from "date-fns";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from "date-fns";
import { isSameMonth, isSameDay, addDays } from "date-fns";
import styles from "./Calendar.module.css";
import CalendarSchedule from "./Schedule.js";

const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <div className={`${styles.header} ${styles.headerRow}`}>
      <Icon
        icon="material-symbols:arrow-back-ios-new-rounded"
        onClick={prevMonth}
      />
      <div className={styles.headerColStart}>
        <span className={styles.headerColText}>
          <span className={styles.headerColTextMonth}>
            {format(currentMonth, "M")}월
          </span>
          {format(currentMonth, "yyyy")}
        </span>
      </div>
      <Icon
        icon="material-symbols:arrow-forward-ios-rounded"
        onClick={nextMonth}
      />
    </div>
  );
};

const RenderDays = () => {
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

const RenderCells = ({ currentMonth, selectedDate, onDateClick }) => {
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
              : isSameDay(day, selectedDate)
              ? `${styles.bodyRowColSellect}`
              : format(currentMonth, "M") !== format(day, "M")
              ? `${styles.bodyRowColNotValid}`
              : `${styles.bodyRowColValid}`
          }`}
          key={formatDay}
          id={formatDay}
          onClick={() => {
            onDateClick(copyday);
          }}
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
          {/* schedule 박스 넣을 곳 */}
          <div>
            <CalendarSchedule times={['서유진 7시']} date={formatDay}/>
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
        <div className={styles.bodyRowColNotValid} key={i}>
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

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    console.log(day)
    const formatDay = format(day, "yyyy-MM-dd");
    const A = formatDay.split('-').map((item) => parseInt(item));
    console.log(A)
    console.log(formatDay)
    setSelectedDate(day);
    // console.log(day);
    console.log(document.getElementById(formatDay));
  };
  return (
    <div className={styles.calendar}>
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <div className={styles.calendarBody}>
        <RenderDays />
        <RenderCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
        />
      </div>
    </div>
  );
};

export default Calendar;
