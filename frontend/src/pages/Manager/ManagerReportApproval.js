import React, {useState} from 'react';
import styles from './ManagerReportApproval.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";
import ModalBasic from './Modal/ModalBasic';
const dummydata=[
    {
        id:1,
        name: "정원철",
        gender: "남",
        birth: "1997.03.16",
        email: "GOOGLE@GMAIL.COM",
        award: "NABBA KOREA -78KG 체급 1위",
        cirt: "생활체육지도사 자격증 2급",
        career: "마이짐 휘트니스 2001.03 - 2002.02",
    },
    {
        id:2,
        name: "정원철",
        gender: "남",
        email: "GOOGLE@GMAIL.COM",
        birth: "1997.03.16",
        award: "NABBA KOREA -78KG 체급 1위",
        cirt: "생활체육지도사 자격증 2급",
        career: "마이짐 휘트니스 2001.03 - 2002.02",
    },
    {
        id:3,
        name: "정원철",
        gender: "남",
        email: "GOOGLE@GMAIL.COM",
        birth: "1997.03.16",
        award: "NABBA KOREA -78KG 체급 1위",
        cirt: "생활체육지도사 자격증 2급",
        career: "마이짐 휘트니스 2001.03 - 2002.02",
    },
]

const ManagerReportApproval = () => {

    const [modalOpen, setModalOpen] = useState(false);

    // 모달창 노출
    const showModal = () => {
        setModalOpen(true);
    };

    console.log(modalOpen);
    return (
        <>
        <div className={styles.info_content_box}>
            <div className={styles.content_title}>신고관리 <span className={styles.square}>&#9660;</span></div>
             <span>불편함을 느낀 MPTI 고객님들의 목소리에 귀를 기울여 주세요!</span>
            <div className={styles.content_content}>
      
                <ul className={styles.content_list}>
                    {dummydata.map(it=>{
                            return(
                                <li  key={it.id} className={styles.content_item}>
                                <div className={styles.item_info_box}>
                                    <div style={{color:"black", fontSize:"32px"}}><FontAwesomeIcon icon={faLightbulb}/></div>
                                    <div className={styles.item_info} > 
                                        <div>성명: {it.name}</div> | 
                                        <div>E-MAIL: {it.email} </div> | 
                                        <div>생년월일 : {it.birth}</div> 
                                    </div>

                                    <div className={styles.item_btn}>
                                      
                                        <button className={styles.btn_negative} onClick={()=> setModalOpen(!modalOpen)}>확인</button>
                                        {modalOpen && <ModalBasic setModalOpen={setModalOpen} />}
                                    </div>
                                </div>

                            </li>
                            )
                             
                    })}
                </ul>
                
            </div>
        </div>
</>

    );
};

export default ManagerReportApproval;