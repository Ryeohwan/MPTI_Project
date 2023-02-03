import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicLoadingSpinner from "../../components/Loading/BasicLoadingSpinner";
import styles from "./ManagerReportApproval.module.css";
import ReportModal from "./Modal/ReportModal";
import ReportModalContainer from "./Modal/ReportModalContainer";
const dummydata = [
  {
    id: 1,
    name: "정원철",
    gender: "남",
    birth: "1997.03.16",
    email: "GOOGLE@GMAIL.COM",
    award: "NABBA KOREA -78KG 체급 1위",
    cirt: "생활체육지도사 자격증 2급",
    career: "마이짐 휘트니스 2001.03 - 2002.02",
    report: "폭행을 했습니다.",
    reportman: "이예은",
  },
  {
    id: 2,
    name: "정원철",
    gender: "남",
    email: "GOOGLE@GMAIL.COM",
    birth: "1997.03.16",
    award: "NABBA KOREA -78KG 체급 1위",
    cirt: "생활체육지도사 자격증 2급",
    career: "마이짐 휘트니스 2001.03 - 2002.02",
    report: "추행을 했습니다.",
    reportman: "안려환",
  },
  {
    id: 3,
    name: "정원철",
    gender: "남",
    email: "GOOGLE@GMAIL.COM",
    birth: "1997.03.16",
    award: "NABBA KOREA -78KG 체급 1위",
    cirt: "생활체육지도사 자격증 2급",
    career: "마이짐 휘트니스 2001.03 - 2002.02",
    report: "강도질을 했습니다.",
    reportman: "지선호",
  },
];

const ManagerReportApproval = () => {

  const [loading, setLoading] = useState(false);
  const [reportList, setReportList] = useState([]);
  const onReportListCreate=() =>{
    setLoading(true);

    setTimeout(()=>{
      axios.get("/opinion/report/list")
      .then((res)=>{
          console.log(res.data);
          const data= res.data;
          const reportlist= data.map(it=>{
            //  형식 정해지면 넣을거임
            return{
  
            }
          })
          setLoading(false);
          setReportList(reportlist);
        })
        .catch((err)=>{
        setLoading(false);
          console.log(err);
      })
    },500)
   
}
  useEffect(()=>{
    onReportListCreate();
  }, [])






  const [modal, setModal] = useState({
    show: false,
    name: "",
    reportman: "",
    report: "",
  });

  const handleOpenModal = (name, reportman, report) => {
    setModal({
      show: true,
      name,
      reportman,
      report,
    });
  };

  const handleCloseModal = () => {
    setModal({
      show: false,
      name: "",
      reportman: "",
      report: "",
    });
  };


  const reportHandler = (name, days)=>{
    if(!days || name){
        return;
    }
    const baseURL=""
    axios.post(baseURL+"/report/process",{name: name, days:days})

  }
  return (
    <>
      <div className={styles.info_content_box}>
        <div className={styles.content_title}>
          신고관리 <span className={styles.square}>&#9660;</span>
        </div>
        <span>불편함을 느낀 MPTI 고객님들의 목소리에 귀를 기울여 주세요!</span>
        <div className={styles.content_content}>
          <ul className={styles.content_list}>
            {dummydata.map((it) => {
              return (
                <li key={it.id} className={styles.content_item}>
                  <div className={styles.item_info_box}>
                    <div className={styles.item_info}>
                      <div>성명: {it.name}</div> |<div>E-MAIL: {it.email} </div>{" "}
                      |<div>생년월일 : {it.birth}</div>
                    </div>
                    <div className={styles.item_btn}>
                      <button
                        className={styles.btn_negative}
                        onClick={() =>
                          handleOpenModal(it.name, it.reportman, it.report)
                        }
                      >
                        확인
                      </button>
                    </div>
                  </div>
                  {loading ? <BasicLoadingSpinner /> : null}
                  {modal.show && (
                    <ReportModalContainer onClose={handleCloseModal}>
                      <ReportModal
                        name={modal.name}
                        reportman={modal.reportman}
                        report={modal.report}
                        onClose={handleCloseModal}
                      />
                    </ReportModalContainer>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ManagerReportApproval;
