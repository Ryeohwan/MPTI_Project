import React from 'react';
import styles from './ManagerSignupApproval.module.css';
import trainerImg from '../../assets/img/trainer.PNG';
const ManagerSignupApproval = () => {
    return (
        <>
                <div className={styles.info_content_box}>
                    <div className={styles.content_title}>가입승인 <span className={styles.square}>&#9660;</span></div>
                     <span>MPTI에 지원하신 트레이너님들의 목록을 확인하세요</span>
                    <div className={styles.content_content}>
              
                        <ul className={styles.content_list}>

                            <li className={styles.content_item}>
                                <div className={styles.item_img}>
                                    <img src={trainerImg}></img>
                                </div>

                                <div className={styles.item_info_box}>
                                    <div className={styles.item_info} > 
                                        <div>신청자 성명: 정원철 (남)</div>
                                        <div>E-MAIL: GOOGLE@GMAIL.COM </div>
                                        <div>생년월일 : 1997.03.16</div>
                                        <div>수상내역 : NABBA KOREA -78KG 체급 1위</div>
                                        <div>자격증 : 생활체육지도사 자격증 2급</div>
                                        <div>근무이력 : 마이짐 휘트니스 2001.03 - 2002.02</div>
                                    </div>

                                    <div className={styles.item_btn}>
                                        <button className={styles.btn_positive}>승인</button>
                                        <button className={styles.btn_negative}>거절</button>
                                    </div>
                                </div>

                            </li>
                        </ul>
                        
                    </div>
                </div>
       </>
    );
};

export default ManagerSignupApproval;

          