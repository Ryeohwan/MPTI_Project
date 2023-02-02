import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "./Login.module.css"
import kakao from "../../assets/img/login_kakao.png";
import naver from "../../assets/img/login_naver.png";
import google from "../../assets/img/login_google.png";
const Login = () => {

    
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [isEmail,setIsEmail] = useState(undefined);
const [isPassword,setIsPassword] = useState(undefined);

const [msgEmail,setMsgEmail] = useState("");
const [msgPassword,setMsgPassword] = useState("");


const emailChangeHandler = (e) =>{
    const curEmail = e.target.value;
    const emailValidCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    setEmail(curEmail);
    if(!emailValidCheck.test(curEmail)){
        setIsEmail(false);
        setMsgEmail("이메일 형식이 알맞지 않습니다.");
    }else{
        setIsEmail(true);
        setMsgEmail("");
    }
}

const passwordChangeHandler = (e) =>{
    const curPassword = e.target.value;
    setPassword(curPassword);
    const passwordValidCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,16}$/;
    if(!passwordValidCheck.test(curPassword)){
        setIsPassword(false);
        setMsgPassword("특수문자, 영어, 숫자를 포함한 9-16사이의 값을 입력하세요");
    }else{
        setIsPassword(true);
        setMsgPassword("");
    } 
}


const onSubmitHandler = async (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8080/user/check", {email: email, password:password}).then(res=>{
        console.log(res);
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
    }).catch((error)=>{
        console.log(error);
    })
}



return (
    <div className={styles.Login}> 
            <div className={styles.header_box}>
                <div className={styles.header}>MPTI</div>
            </div>
            
        <form onSubmit={onSubmitHandler}>
            <div className={styles.form_box}>
            <input className={styles.form_input} type="email" value={email} id="email" onChange={emailChangeHandler} placeholder="email"/>
            <div className={styles.comment}><p>{msgEmail}</p></div>
            </div>

            <div className={styles.form_box}>
            <input  className={styles.form_input} type="password" value={password} id="password" onChange={passwordChangeHandler} placeholder="password"/>
            <div className={styles.comment}><p>{msgPassword}</p></div>
            </div>

            <div className={styles.form_sign_box}><div className={styles.form_sign}>회원가입</div></div>
            {(isEmail && isPassword)?
             <div className={styles.form_btn_box}><button >LOGIN</button></div>:
              <div className={styles.form_btn_box_none}>< button  disabled={true}>로그인</button></div>  }
           
            <div className={styles.form_simple}>간편 회원가입</div>
            
            <div className={styles.simple_box}>
                <div className={styles.simple_btn_kakao}><img src={kakao}></img>Kakao</div>
                <div className={styles.simple_btn_google}> <img src={google}></img>Google</div>
                <div className={styles.simple_btn_naver}> <img src={naver}></img>Naver</div>
            </div>

        </form>
    </div>
);
};

export default Login;
