import styles from "./ReportModal.module.css";
import { useState } from 'react';
import axios from "axios";
import reportBell from '../../../assets/img/reportbell.png';
import { useDispatch } from 'react-redux';
import { reportApproval } from "../../../store/admin";
const ReportModal = ({ writerName, targetName,memo,reportType,id ,onClose }) => {
    
  const dispatch = useDispatch();
  
  const [days, setDays]= useState("");
    
    const selectHandler = (e)=>{
        setDays(e.target.value)
    }
    const reportHandler = ()=>{
        if(!days){
            alert("제재 기간을 입력해주세요!")
            return;
        }
        

        const criminal = {
          blockPeriod: days,
          id: id,
          
        }
        dispatch(reportApproval(criminal));
        // axios.post("/api/business/opinion/report/process", crimimnal).then((res)=>{
        //   console.log(res);
        // }).catch((err)=>{
        //   console.log(err)
        // })
        
       
        console.log(criminal);
        
    }

  return (
    <div className={styles.ReportModal}>
      <h1 className={styles.title}>신고처리 <img src={reportBell} style={{width:"60px", height: "60px"}}></img></h1>
      <h3>신고 유저</h3>
      <div className={styles.name}>{writerName}</div>
      <h3>피신고 유저</h3>
      <div className={styles.name}>{targetName}</div>
      <h3>신고분류</h3>
      <div className={styles.name}>{reportType}</div>
      <h3>신고사유</h3>
      <div className={styles.report}>{memo}</div>

      <div className={styles.process}>
        <div className={styles.process_reportman}>
          <div className={styles.process_title}>제재유저</div>
          <div className={styles.process_name}>{targetName}</div>
        </div>

        <div className={styles.process_sanctions}>
          <div className={styles.process_title}>제재일수</div>

          <div className={styles.process_select}>
            <select onChange={selectHandler} defaultValue={days}>
              <option value={""}>기간</option>
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
