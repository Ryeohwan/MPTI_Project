import React, { useEffect, useState } from 'react';
import styles from './ManagerSignupApproval.module.css';
import trainerImg from '../../assets/img/trainer.PNG';
import axios from 'axios';

const dummydata=[
    {
        id:1,
        name: "정원철",
        birth: "1997.03.16",
        email: "GOOGLE@GMAIL.COM",
        award: "NABBA KOREA -78KG 체급 1위",
        cirt: "생활체육지도사 자격증 2급",
        career: "마이짐 휘트니스 2001.03 - 2002.02",
    },
    {
        id:2,
        name: "정원철",
        email: "GOOGLE@GMAIL.COM",
        birth: "1997.03.16",
        award: "NABBA KOREA -78KG 체급 1위",
        cirt: "생활체육지도사 자격증 2급",
        career: "마이짐 휘트니스 2001.03 - 2002.02",
    },
    {
        id:3,
        name: "정원철",
        email: "GOOGLE@GMAIL.COM",
        birth: "1997.03.16",
        award: "NABBA KOREA -78KG 체급 1위",
        cirt: "생활체육지도사 자격증 2급",
        career: "마이짐 휘트니스 2001.03 - 2002.02",
    },
]

const ManagerSignupApproval = () => {
    

    const [signupList, setSignupList] = useState([]);

    useEffect(()=>{
        const onSignUpListCreate=() =>{
            axios.get("/trainer/application/list")
            .then((res)=>{
                console.log(res);
                setSignupList(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }, [signupList])
   




    const approveHandler = ()=>{
        axios.post("/trainer/application/process")
    }

    const negativeHandler = ()=>{
        axios.post("/trainer/application/process")
    }

    return (
        <>
                <div className={styles.info_content_box}>
                    <div className={styles.content_title}>가입승인 <span className={styles.square}>&#9660;</span></div>
                     <span>MPTI에 지원하신 트레이너님들의 목록을 확인하세요</span>
                    <div className={styles.content_content}>
              
                        <ul className={styles.content_list}>
                            {dummydata.map(it=>{
                                    return(
                                        <li  key={it.id} className={styles.content_item}>
                                        <div className={styles.item_img}>
                                        <img src={trainerImg}></img>
                                        </div>
        
                                        <div className={styles.item_info_box}>
                                            <div className={styles.item_info} > 
                                                <div>신청자 성명: {it.name}</div>
                                                <div>E-MAIL: {it.email} </div>
                                                <div>생년월일 : {it.birth}</div>
                                                <div>수상내역 : {it.award}</div>
                                                <div>자격증 : {it.cirt}</div>
                                                <div>근무이력 : {it.career}</div>
                                            </div>
        
                                            <div className={styles.item_btn}>
                                                <button className={styles.btn_positive} onClick={approveHandler}>승인</button>
                                                <button className={styles.btn_negative} onClick={negativeHandler}>거절</button>
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

export default ManagerSignupApproval;

          