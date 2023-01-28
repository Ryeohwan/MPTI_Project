import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./ClientMyReservation.module.css";
import TopTitle from "../../components/Common/TopTitle";

const ClientMyReservation = () => {
  const [value, onChange] = useState(new Date());
  return (
    <>
      <div className={styles.ClientMyReservation}>
        <TopTitle
          title="예약하기▼"
          content="여러분과 딱 맞는 트레이너를 찾아보세요!"
        />
      </div>
      <Calendar
        onChange={onChange}
        value={value}
        className={styles.custom_calendar}
        formatDay={(locale, date) =>
          date.toLocaleString("en", { day: "numeric" })
        }
      />
    </>
  );
};

export default ClientMyReservation;
