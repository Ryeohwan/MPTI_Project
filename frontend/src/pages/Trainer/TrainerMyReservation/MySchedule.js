import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styles from "./MySchedule.module.css";
import Calendar from "../../../components/Calendar/Calendar";

const MySchedule = () => {
  const [allData, setAllData] = useState([]); // get으로 첫 렌더링 시 전체 일정 가져옴
  const {id} = useSelector((state) => state.auth)

  useEffect(() => {
    async function getReservation() {
      const data = await axios.get("/api/business/reservation/list");
      const myData = data.data.filter((item) => item.trainerId === id)
      setAllData(myData);
    }
    getReservation();
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Calendar allData={allData}/>
      </div>
    </div>
  );
};

export default MySchedule;
