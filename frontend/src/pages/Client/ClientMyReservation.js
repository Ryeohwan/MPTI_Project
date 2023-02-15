import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ClientMyReservation.module.css";
import TopTitle from "../../components/Common/TopTitle";
import DateTimePicker from "react-datetime-picker";
import { ko } from "date-fns/esm/locale";
import moment from "moment";
import "react-datetime-picker/dist/DateTimePicker.css";
import "./DateTimePickerCustom.css";
import TrainerCard from "../../components/Card/TrainerCard";
import axios from "axios";

const ClientMyReservation = () => {
  const [value, setValue] = useState(new Date());
  const [text, setText] = useState("");
  const [trainer, setTrainer] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const asyncfunc = async () => {
      try {
        const response = await axios.get("/api/trainer/list/0");
        const trainer = response.data.content;
        await setTrainer(trainer);
      } catch (error) {
        console.log(error);
      }
    };

    asyncfunc();
  }, []);
  const [item, setItem] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onClickName = () => {
    setItem("name");
  };
  const onClickDate = () => {
    setItem("date");
  };
  const handleMessage = () => {
    if (text === "") {
      return inputRef.current.focus();
    }
    setText(""); // 엔터 후 input 빈값으로 수정
    inputRef.current.focus(); // 전송 후 input 포커스
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };

  return (
    <div className={styles.my_reservation}>
      <TopTitle
        title="예약하기▼"
        content="여러분과 딱 맞는 트레이너를 찾아보세요!"
      />
      <div className={styles.SearchItem}>
        <span
          className={styles.SearchName}
          onClick={onClickName}
          style={item === "name" ? { color: "#C9FD61" } : null}
        >
          이름으로 찾기
        </span>
        <span
          className={styles.SearchDateTime}
          onClick={onClickDate}
          style={item === "date" ? { color: "#C9FD61" } : null}
        >
          날짜로 찾기
        </span>
      </div>
      {item === "date" ? (
        <div>
          <DateTimePicker
            className={styles.SearchDateTimePicker}
            yearPlaceholder="연도"
            monthPlaceholder="월"
            dayPlaceholder="일"
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
          />
          <div className={styles.SearchInfo}>
            ※ 원하는 PT 시작 시간을 입력하세요
          </div>
        </div>
      ) : (
        <input
          className={styles.SearchNameInput}
          placeholder="이름을 입력하세요"
          value={text}
          onChange={onChange}
          ref={inputRef}
          onKeyUp={handleKeyUp}
        />
      )}

      <div className={styles.home_trainer_box}>
        <TrainerCard trainers={trainer} />

      </div>
    </div>
  );
};

export default ClientMyReservation;
