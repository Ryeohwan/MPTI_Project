import styles from "./TrainerReportModal.module.css";
import { useState } from 'react';
import axios from "axios";
import reportBell from '../../../assets/img/reportbell.png';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const TrainerReportModal = ({ writerName, targetName,writerId,targetId,onClose }) => {
    
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [reportType, setReportType] = useState("욕설/비난")
  const [memo, setMemo]= useState("");
  console.log(writerName, targetName,writerId,targetId);
    const reportHandler = ()=>{

        const report = {
            writerId: writerId,
            targetId: targetId,
            writerName: writerName,
            targetName: targetName,
            reportType: reportType,
            memo: memo,
        }

        axios.post("/api/business/opinion/report/write",report).then(res=>{
            console.log(res);
            alert("신고 완료")
            onClose()
        }).catch((err)=>{
            alert("신고 실패, 입력을 재확인 해주세요.")
            onClose()
        })

        console.log(report);
    }

    const selectHandler = (e)=>{
        setReportType(e.target.value)
    }

  return (
    <div className={styles.ReportModal}>
      <h1 className={styles.title}>신고작성 <img src={reportBell} style={{width:"60px", height: "60px"}}></img></h1>
      <h3>신고 유저</h3>
      <div className={styles.name}>{writerName}</div>
      <h3>피신고 유저</h3>
      <div className={styles.name}>{targetName}</div>

      <div className={styles.process_sanctions}>
          <div className={styles.process_title}>신고분류</div>

      <div className={styles.process_select}>
         <select onChange={selectHandler} defaultValue={reportType}>
            <option value={"욕설/비난"}>욕설/비난</option>
            <option value={"성폭력"}>성범죄</option>
            <option value={"수업불성실"}>수업불성실</option>
            <option value={"기타"}>기타</option>
            </select>
          </div>
        </div>

      <h3>신고사유</h3>
        <div className={styles.memo_box}>
            <textarea className={styles.memo} onChange={(e)=>{ setMemo(e.target.value)}} />
        </div>



      <div className={styles.btnbox}>
        <div className={styles.btn}>
          <button className={styles.btn_ok} onClick={reportHandler}>
            신고하기
          </button>
          <button className={styles.btn_no} onClick={onClose}>
            창 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerReportModal;
