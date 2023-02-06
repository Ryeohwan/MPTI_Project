import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux"
import styles from "./Login.module.css"
import kakao from "../../assets/img/login_kakao.png";
import naver from "../../assets/img/login_naver.png";
import google from "../../assets/img/login_google.png";
import { useNavigate } from 'react-router-dom';
import { login }  from '../../store/auth';

import BasicLoadingSpinner from '../Loading/BasicLoadingSpinner';
const Login = () => {
const dispatch = useDispatch();
const navigate=useNavigate();
const { isLoading, isLoggedIn} = useSelector((state) => state.auth);
const [userInfo, setUserInfo] = useState({
    email: "",
    isEmail: undefined,
    emailMsg: "",
    password: "",
    isPassword: undefined,
    passwordMsg: ""
})



useEffect(()=>{
    if(isLoggedIn){
        navigate("/home");
    }
},[isLoggedIn])

const userInfoHandler= (e)=>{
    switch(e.target.name){
        case "email":
            const curEmail = e.target.value;
            const emailValidCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
            !emailValidCheck.test(curEmail) ? setUserInfo({...userInfo, email: curEmail, isEmail: false, emailMsg: "이메일 형식이 알맞지 않습니다."}):setUserInfo({...userInfo, email: curEmail,isEmail: true, emailMsg: ""});
            break;
        case "password":
            const curPassword = e.target.value;
            const passwordValidCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,16}$/;
            !passwordValidCheck.test(curPassword)?setUserInfo({...userInfo, password: curPassword, isPassword: false, passwordMsg: "특수문자, 영어, 숫자를 포함한 9-16사이의 값을 입력하세요"}): setUserInfo({...userInfo,password: curPassword, isPassword: true, passwordMsg: ""});
            break;
        default:
            break;
    }
}

const onSubmitHandler = (e)=>{
    e.preventDefault();
    console.log(userInfo.email, userInfo.password);
    dispatch(login(userInfo.email, userInfo.password));
}

return (
    <div className={styles.Login}> 
    {isLoading ? <BasicLoadingSpinner/>: 
    <>
    <div className={styles.header_box}>
                <div className={styles.header}>MPTI</div>
            </div>
            
        <form onSubmit={onSubmitHandler}>
            <div className={styles.form_box}>
            <input className={styles.form_input} type="email" name="email" defaultValue={userInfo.email} id="email" onChange={userInfoHandler} placeholder="email"/>
            <div className={styles.comment}><p>{userInfo.emailMsg}</p></div>
            </div>

            <div className={styles.form_box}>
            <input  className={styles.form_input} type="password"  name="password" defaultValue={userInfo.password} id="password" onChange={userInfoHandler} placeholder="password"/>
            <div className={styles.comment}><p>{userInfo.passwordMsg}</p></div>
            </div>

            <div className={styles.form_sign_box}><div className={styles.form_sign}>회원가입</div></div>
            {(userInfo.isEmail && userInfo.isPassword)?
             <div className={styles.form_btn_box}><button >LOGIN</button></div>:
              <div className={styles.form_btn_box_none}>< button  disabled={true}>로그인</button></div>  }
           
            <div className={styles.form_simple}>간편 회원가입</div>
            
            <div className={styles.simple_box}>
             <div className={styles.simple_btn_kakao} onClick={()=>window.location.href="http://i8a803.p.ssafy.io/api/auth/oauth2/authorize/kakao?redirect_uri=http://localhost:3000/oauth2/redirect"}><img src={kakao}></img>Kakao</div>
                <div className={styles.simple_btn_google} onClick={()=>window.location.href="http://i8a803.p.ssafy.io/api/auth/oauth2/authorize/google?redirect_uri=http://localhost:3000/oauth2/redirect"}> <img src={google}></img>Google</div>
                <div className={styles.simple_btn_naver} onClick={()=>window.location.href="http://i8a803.p.ssafy.io/api/auth/oauth2/authorize/naver?redirect_uri=http://localhost:3000/oauth2/redirect"}> <img src={naver}></img>Naver</div>
            </div>

        </form></>}
    </div>
);
};

export default Login;
