import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from "./Login.module.css"

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
        //console.log(email);
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

const testLogin = (body)=>{
    console.log(body);
    axios.post("/login", body ).then(res=>{
        console.log(res.data);
    }).catch((error)=>{
        console.log(error)
    })
}

const onSubmitHandler = (e)=>{
    e.preventDefault();
    testLogin({email: email, password: password})
}



return (
    <div className={styles.Login}> 
        <form onSubmit={onSubmitHandler}>
            <div>
            <label htmlFor="email">Email</label>
            <input type="email" value={email} id="email" onChange={emailChangeHandler}/>
            <p>{msgEmail}</p>
            </div>

            <div>
            <label htmlFor="password">Password</label>
            <input type="password" value={password} id="password" onChange={passwordChangeHandler}/>
            <p>{msgPassword}</p>
            </div>

            {(isEmail && isPassword)? <button>로그인</button>: <button disabled={true}>로그인</button> }
        </form>
    </div>
);
};

export default Login;