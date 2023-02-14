import styles from "./AccountModal.module.css";
import { useState } from 'react';
import reportBell from '../../../assets/img/reportbell.png';

const AccountModal = ({ name, email, gender, phone, birth, id ,onClose }) => {
  

  return (
    <div className={styles.ReportModal}>
      <h1 className={styles.title}>계정정보 </h1>
      <div className={styles.name}>{name}</div>
      <h3>이름</h3>
      <div className={styles.name}>{name}</div>
      <h3>성별</h3>
      <div className={styles.name}>{gender === 'F' ? "남성" : "여성"}</div>
      <h3>생년월일</h3>
      <div className={styles.name}>{}</div>
      <h3>이메일</h3>
      <div className={styles.name}>{email}</div>
      <h3>휴대폰 번호</h3>
      <div className={styles.name}>{phone}</div>



      <div className={styles.btnbox}>
        <div className={styles.btn}>

          <button className={styles.btn_no} onClick={onClose}>
            창 닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
