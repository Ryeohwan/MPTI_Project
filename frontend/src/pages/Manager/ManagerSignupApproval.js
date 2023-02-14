import React, { useEffect, useState } from "react";
import styles from "./ManagerSignupApproval.module.css";
import trainerImg from "../../assets/img/trainer.PNG";

import { useDispatch } from "react-redux";
import { signupTrainerList, signupApproval } from "../../store/admin";
import './Paging.css';
import Pagination from "react-js-pagination";
const ManagerSignupApproval = () => {
  const [signupList, setSignupList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    //가입신청 리스트
    dispatch(signupTrainerList(page - 1)).then((res) => {

      setTotalPage(res.totalElements);

      const licensesString = res.content[0].awards;
      const licensesArray = JSON.parse(licensesString);
      const [licenseA, licenseB] = licensesArray;
      console.log(licenseA);
      console.log(res);
      setSignupList(res.content)
    });
  }, [page]);

  //가입 승인 반려 신청 (승인, 반려 신청 반응 ok but 신청 목록이 변함이 없음)
  const approveHandler = (email) => {
    if (window.confirm("가입신청을 승인 하시겠습니까?")) {
      console.log(email);
      dispatch(signupApproval({ email: email, approved: true }));
    } else {
      return;
    }
  };
  const negativeHandler = (email) => {
    if (window.confirm("가입신청을 거절 하시겠습니까?")) {
      dispatch(signupApproval({ email: email, approved: false }));
    } else {
      return;
    }
  };

  return (
    <>
      <div className={styles.info_content_box}>
        <div className={styles.content_title}>
          가입승인 <span className={styles.square}>&#9660;</span>
        </div>
        <span>MPTI에 지원하신 트레이너님들의 목록을 확인하세요</span>
        <div className={styles.content_content}>
          <ul className={styles.content_list}>
            {signupList.map((it) => {
              return (
                <li key={it.email} className={styles.content_item}>
                  <div className={styles.item_img}>
                    <img src={it.s3Url}></img>
                  </div>

                  <div className={styles.item_info_box}>
                    <div className={styles.item_info}>
                      <div>신청자 성명: {it.name}</div>
                      <div>E-MAIL: {it.email} </div>
                      <div>생년월일 : {it.birthday}</div>
                      <div>수상내역 :  {(() => {
                        const Awards = JSON.parse(it.awards);
                        return (
                          <React.Fragment>
                            {Awards.map((award, index) => (
                              <span key={index}> {award}</span>
                            ))}
                          </React.Fragment>
                        );
                      })()}
                      </div>
                      <div>자격증 :  {(() => {
                        const Licenses = JSON.parse(it.license);
                        return (
                          <React.Fragment>
                            {Licenses.map((license, index) => (
                              <span key={index}> {license}</span>
                            ))}
                          </React.Fragment>
                        );
                      })()}
                      </div>
                      <div>근무이력 :  {(() => {
                        const Careers = JSON.parse(it.career);
                        return (
                          <React.Fragment>
                            {Careers.map((career, index) => (
                              <span key={index}> {career}</span>
                            ))}
                          </React.Fragment>
                        );
                      })()}</div>
                    </div>

                    <div className={styles.item_btn}>
                      <button
                        className={styles.btn_positive}
                        onClick={() => approveHandler(it.email)}
                      >
                        승인
                      </button>
                      <button
                        className={styles.btn_negative}
                        onClick={() => negativeHandler(it.email)}
                      >
                        거절
                      </button>
                    </div>
                  </div>

                </li>
              );
            })}
          </ul>
        </div>
        <div className={styles.pagenation}>
          <Pagination
            activePage={page}
            itemsCountPerPage={4}
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

export default ManagerSignupApproval;
