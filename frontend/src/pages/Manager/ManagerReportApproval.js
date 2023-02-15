import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./ManagerReportApproval.module.css";
import ReportModal from "./Modal/ReportModal";
import ReportModalContainer from "./Modal/ReportModalContainer";
import { reportList } from "../../store/admin";
import Pagination from "react-js-pagination";

const ManagerReportApproval = () => {
  const dispatch= useDispatch();
  const [page, setPage] = useState(1);
  const [report, setReport] = useState([]);
  const [totalPage, setTotalPage]= useState(0);
  const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
  };

  useEffect(()=>{
    // 신고목록 API 설정
    dispatch(reportList(page-1)).then((res)=>{
      console.log(res);
      setTotalPage(res.totalElements);
      const sortedReport =res.content.sort((a,b)=> {
        if (a.stopUntil === null) {
          return -1;
        }
        if (b.stopUntil === null) {
          return 1;
        }
        return a.stopUntil.localeCompare(b.stopUntil);
      } );
      console.log(sortedReport[0].stopUntil);
      setReport(sortedReport);
    })

  }, [page])

  const [modal, setModal] = useState({
    show: false,
    writerName: "",
    targetName: "",
    reportType: "",
    memo:"",
    id:""
  });

  const handleOpenModal = (writerName, targetName ,reportType, memo,id) => {
    setModal({
      show: true,
      writerName,
      targetName,
      reportType,
      memo,
      id,
    });
  };

  const handleCloseModal = () => {
    setModal({
      show: false,
      writerName: "",
      targetName: "",
      reportType: "",
      id:"",
      memo: "",
    });
  };


  // 신고 승인/반려 API 인자 설정중
  // const reportHandler = (name, days)=>{
  //   if(!days || name){
  //       return;
  //   }
  //   const data = {id: name, blockPeriod: days}
  //   dispatch(reportApproval(data))
  // } 
  return (
    <>
      <div className={styles.info_content_box}>
        <div className={styles.content_title}>
          신고관리 <span className={styles.square}>&#9660;</span>
        </div>
        <span>불편함을 느낀 MPTI 고객님들의 목소리에 귀를 기울여 주세요!</span>
        <div className={styles.content_content}>
          <ul className={styles.content_list}>
            {report.map((it,index) => {
              return (
              
                <li key={it.id} style={it.stopUntil? {backgroundColor:"grey"}:null} className={styles.content_item}>
                  <div className={styles.item_info_box}>
                    <div className={styles.item_info}>
                    <img src="/reportbell.png"/>  <div className={styles.item_index}>{(8*(page-1))+index+1}</div> <div>신고자: {it.writerName}</div> <div>피신고자: {it.targetName}</div> <div>사건 분류: {it.reportType} </div>
                      
                    </div>
                    <div className={styles.item_btn}>
                      <button disabled={it.stopUntil}
                        className={styles.btn_negative}
                        onClick={() =>
                          handleOpenModal(it.writerName,it.targetName,  it.reportType, it.memo, it.id)
                        }
                      >
                        {
                          !it.stopUntil? <span>확인</span> : <span style={{color:"black"}}>완료</span>
                      }
                        <span></span>
                      </button>
                    </div>
                  </div>
                  
                  {modal.show && (
                    <ReportModalContainer onClose={handleCloseModal}>
                      <ReportModal
                        writerName={modal.writerName}
                        targetName={modal.targetName}
                        reportType={modal.reportType}
                        memo={modal.memo}
                        id={modal.id}
                        onClose={handleCloseModal}
                      />
                    </ReportModalContainer>
                  )}
                </li>
              );
            })}
          </ul>
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
    </>
  );
};

export default ManagerReportApproval;
