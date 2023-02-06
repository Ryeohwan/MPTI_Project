import styles from "./ReportModal.module.css";
import { useState } from 'react';
import axios from "axios";
const ReportModal = ({ name, report, reportman, onClose }) => {
    const [days, setDays]= useState("");
    
    const selectHandler = (e)=>{
        setDays(e.target.value)
    }
    const reportHandler = ()=>{
        if(!days){
            alert("제재 기간을 입력해주세요!")
            return;
        }

        const crimimnal = {
          id: 1,
          days: 2
        }
        axios.post("/opinion/report/process", crimimnal).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log(err)
        })
        
       
        console.log(crimimnal);
        
    }

  return (
    <div className={styles.ReportModal}>
      <h1>신고처리</h1>

      <h3>신고 유저</h3>
      <div className={styles.name}>{name}</div>
      <h3>피신고 유저</h3>
      <div className={styles.name}>{reportman}</div>
      <h3>신고사유</h3>
      <div className={styles.report}>{report}</div>

      <div className={styles.process}>
        <div className={styles.process_reportman}>
          <div className={styles.process_title}>제재유저</div>
          <div className={styles.process_name}>{reportman}</div>
        </div>

        <div className={styles.process_sanctions}>
          <div className={styles.process_title}>제재일수</div>

          <div className={styles.process_select}>
            <select onChange={selectHandler} defaultValue={""}>
              <option value={0}>무죄</option>
              <option value={1}>1일</option>
              <option value={3}>3일</option>
              <option value={7}>7일</option>
              <option value={14}>14일</option>
              <option value={30}>30일</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.btnbox}>
        <div className={styles.btn}>
          <button className={styles.btn_ok} onClick={reportHandler}>
            제재진행
          </button>
          <button className={styles.btn_no} onClick={onClose}>
            창 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
