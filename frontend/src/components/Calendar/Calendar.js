import React, { useEffect, useState } from "react";
import { format, addMonths, subMonths } from "date-fns";
import styles from "./Calendar.module.css";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import CalendarCells from "./CalendarCells";

const Calendar = ({getNewDay, newData}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [click, setClick] = useState(false);

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day) => {
    const formatDay = format(day, "yyyy-MM-dd");
    const intDate = formatDay.split("-").map((item) => parseInt(item));
    getNewDay(intDate)
    setSelectedDate(day);
    setClick(!click)
  };

  useEffect(()=>{
    

  },[])

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
          click={click}
          newData={newData}
        />
      </div>
    </div>
  );
};

export default Calendar;
