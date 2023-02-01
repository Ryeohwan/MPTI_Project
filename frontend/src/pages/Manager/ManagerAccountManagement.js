import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ManagerAccountManagement.module.css";

const ManagerAccountManagement = () => {


  const [accountList, setAccountList] = useState([]);

  useEffect(()=>{
      const onAccountListCreate=() =>{
          axios.get("i8a803.p.ssafy.io:3003")
          .then((res)=>{
              console.log(res);
              setAccountList(res);
          })
          .catch((err)=>{
              console.log(err);
          })
      }
  }, [accountList])





    const deleteAccountHandler = () =>{
        axios.post("/user/info/delete",{id: 1})
        .then((res) => {
            console.log(res)
        
        
        })
        .catch((err)=>{

        })

    }
  return (
    <>
      <div className={styles.info_content_box}>
        <div className={styles.content_title}>
          계정관리 <span className={styles.square}>&#9660;</span>
        </div>
        <span>MPTI 고객님들의 소중한 계정정보를 확인하고 관리하세요.</span>
        <div className={styles.content_content}>
          <ul className={styles.content_list}>
            <li  className={styles.content_item}>
              <div className={styles.item_info_box}>
                <div className={styles.item_info}>
                  <div>성명: </div> |<div>E-MAIL: </div> |
                  <div>생년월일 : </div>
                </div>
                <div className={styles.item_btn}>
                  <button className={styles.btn_negative} onClick={deleteAccountHandler}>삭제</button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ManagerAccountManagement;
