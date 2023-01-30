import React, { useState } from "react";
import styles from "./ClientMyReservation.module.css";
import TopTitle from "../../components/Common/TopTitle";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css"
import { ko } from "date-fns/esm/locale";
import moment from "moment";

const ClientMyReservation = () => {
  // const [startDate, setStartDate] = useState(new Date());
  const [value, setValue] = useState(new Date());

  return (
    <>
      <div className={styles.ClientMyReservation}>
        <TopTitle
          title="예약하기▼"
          content="여러분과 딱 맞는 트레이너를 찾아보세요!"
        />
      </div>
      <div>
        {/* <DatePicker
          className={styles.SearchDate}
          placeholderText="날짜 선택"
          dateFormat="yyyy년 MM월 dd일"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          locale={ko}
          minDate={new Date()}
        />
        <TimePicker
          colorPalette="dark"
          theme="classic"
          timeConfig={{
            from: "06:00 AM",
            to: "11:00 PM",
            step: 60,
          }}
          timeFormat="HH:MM"
          focused={true}
        /> */}
        <DateTimePicker
          className={styles.SearchDate}
          format="y-MM-dd HH시"
          onChange={setValue}
          value={value}
          autoFocus={true}
          clearIcon={null}
          locale={ko}
          minDate={new Date()}
          maxDetail="hour"
          disableClock={true}
          minDetail="year"
          formatDay={(locale, date) => moment(date).format("DD")}
          // step={60}
          // beginLimit="6:00AM"
          // endLimit="23:00PM"
          // name="default"
        />
        <span></span>
      </div>
   
    </>
  );
};

export default ClientMyReservation;
