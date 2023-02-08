import React from "react";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import styles from "./Calendar.module.css";

const CalendarHeader = ({ currentMonth, prevMonth, nextMonth }) => {
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

export default CalendarHeader;