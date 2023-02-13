import React, { useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import styles from "./Calendar.module.css";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import CalendarCells from "./CalendarCells";

const Calendar = ({ allData, getDaySchedule }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    const formatDay = format(day, "yyyy-MM-dd");
    const intDate = formatDay.split("-").map((item) => parseInt(item));
    const formatToday = format(new Date(), "yyyy-MM-dd");
    const intFormatToday = formatToday.split("-").map((item) => parseInt(item));
    if (intDate[0] > intFormatToday[0]) {
      setSelectedDate(day);
      getDaySchedule(intDate);
    } else if (intDate[0] === intFormatToday[0] && intDate[1] > intFormatToday[1]) {
        setSelectedDate(day);
        getDaySchedule(intDate);
      } else if (intDate[0] === intFormatToday[0] && intDate[1] === intFormatToday[1] && intDate[2] >= intFormatToday[2]) {
        setSelectedDate(day);
        getDaySchedule(intDate);
    }
  }

  return (
    <div className={styles.calendar}>
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <div className={styles.calendarBody}>
        <CalendarDays />
        <CalendarCells
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          onDateClick={onDateClick}
          allData={allData}
        />
      </div>
    </div>
  );
};

export default Calendar;