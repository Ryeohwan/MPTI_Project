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
import { useDispatch } from "react-redux";
import { nameSearch, dateSearch } from "../../store/etc";
import Pagination from "react-js-pagination";

const ClientMyReservation = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState(new Date());
  const [check,setCheck] = useState(false)
  const [text, setText] = useState("");
  const [trainer, setTrainer] = useState([]);
  const inputRef = useRef(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [item, setItem] = useState("name");
  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    const asyncfunc = async () => {
      try {
        const response = await axios.get(`/api/trainer/list/${page-1}`);
        setTotalPage(response.data.totalElements);
        const trainer = response.data.content;
        await setTrainer(trainer);
      } catch (error) {
        console.log(error);
      }
    }
    asyncfunc()
  },[])

  useEffect(() => {
    const asyncfunc = async () => {
      if(item==='name'){
        if(!check){
          try {
            const response = await axios.get(`/api/trainer/list/${page-1}`);
            setTotalPage(response.data.totalElements);
            const trainer = response.data.content;
            setTrainer(trainer);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const response = await dispatch(nameSearch(page-1, check))
              setTotalPage(response.totalElements);
              setTrainer(response.content);
          } catch (error) {
            console.log(error);
          }
        }
      } else if (item === 'date') {
        setPage(1)
        sendDate(value, 1)
      }

    };
    asyncfunc();
  }, [page, check, item]);
  

  const onChange = (e) => {
    setText(e.target.value);
  };
  const onClickName = () => {
    setItem("name");
  };
  const onClickDate = () => {
    setItem("date");
  };

  const handleMessage = async () => {
    if (text === "") {
      setCheck(false)
      setPage(1)
      return inputRef.current.focus();
    }
    else {
      setCheck(text)
      console.log(text)
      setPage(1)
    }
    setText(""); // 엔터 후 input 빈값으로 수정
    inputRef.current.focus(); // 전송 후 input 포커스
  };


  const handleKeyUp = (e) => {
    if (e.key === "Enter") {
      handleMessage();
    }
  };

  const sendDate = async (e, index=0) => {
    setValue(e)
    const date_parsed = e.getFullYear().toString()+(e.getMonth()+1).toString().padStart(2,0)+e.getDate().toString().padStart(2,0)
    const response  =index? await dispatch(dateSearch(index-1, date_parsed)) : await dispatch(dateSearch(page-1, date_parsed))
    setTotalPage(response.totalElements)
    setTrainer(response.content)
    //api를 사용 하여 setTrainer(data_got)
  }



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
        <form>
          <DateTimePicker
            className={styles.SearchDateTimePicker}
            yearPlaceholder="연도"
            monthPlaceholder="월"
            dayPlaceholder="일"
            format="y-MM-dd"
            onChange={(e)=> sendDate(e)}
            value={value}
            autoFocus={false}
            clearIcon={null}
            locale={'ko'}
            minDate={new Date()}
            disableClock={true}
            formatDay={(locale, date) => moment(date).format("DD")}
          />
          <div className={styles.SearchInfo}>
            ※ 원하는 PT 시작 시간을 입력하세요
          </div>
        </form>
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
      <div className={styles.pagenation}>
          <Pagination
            activePage={page}
            itemsCountPerPage={8}
            totalItemsCount={totalPage}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </div>
    </div>
  );
};

export default ClientMyReservation;
