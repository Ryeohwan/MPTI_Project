import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./MySchedule.module.css";
import Calendar from "../../../components/Calendar/Calendar";

const MySchedule = () => {
  const [allData, setAllData] = useState([]); // get으로 첫 렌더링 시 전체 일정 가져옴

  useEffect(() => {
    async function getReservation() {
      const data = await axios.get("/api/business/reservation/list");
      setAllData(data.data);
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
