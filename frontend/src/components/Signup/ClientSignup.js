import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth, { duplicateCheck } from '../../store/auth';
import {signup} from '../../store/auth';
import styles from "./Signup.module.css"
import { useNavigate } from 'react-router-dom';
const ClientSignup = () => {
    const [name, setName] = useState({ name: "", nameMsg: "", isName: false });
    const [gender, setGender] = useState({ gender: "male", isGender: true });
    const [email, setEmail] = useState({ email: "", emailMsg: "", isEmail: false });
    const [password, setPassword] = useState({ password: "", passwordMsg: "", isPassword: false });
    const [passwordConfirm, setPasswordConfirm] = useState({ passwordConfirm: "", passwordConfirmMsg: "", isPasswordConfirm: false });
    const [birth, setBirth] = useState({ birth: "", birthMsg: "", isBirth: false });

    
    const dispatch = useDispatch();
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const genderInputRef = useRef();
    const birthInputRef = useRef();
    const phoneInputRef = useRef();

    const navigate = useNavigate();

    const nameChangeHandler = (e) => {
        const curName = e.target.value;
        setName({ ...name, name: curName });
        console.log(name);
        if (curName.length > 30) {
            setName({ ...name, name: curName, nameMsg: "이름은 30자 이하로 입력해주세요.", isName: false });
        } else {
            setName({ ...name, name: curName, nameMsg: "", isName: true });
        }
    }

    const genderChangeHandler = (e) => {
        const curGender = e.target.value;
        setGender({ gender: curGender, isGender: true });
    }

    const emailChangeHandler = (e) => {
        const curEmail = e.target.value;
        const emailValidCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
        if (!emailValidCheck.test(curEmail)) {
            setEmail({ email: curEmail, emailMsg: "이메일 형식을 갖춰주세요.", isEmail: false })
        } else {
            setEmail({ email: curEmail, emailMsg: "", isEmail: true })
        }
    }

    const passwordChangeHandler = (e) => {
        const curPassword = e.target.value;
        const passwordValidCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,16}$/;
        if (!passwordValidCheck.test(curPassword)) {
            setPassword({ password: curPassword, passwordMsg: "특수문자, 영어, 숫자를 포함한 9-16사이의 값을 입력하세요", isPassword: false });
        } else {
            setPassword({ password: curPassword, passwordMsg: "", isPassword: true });
        }
    }


    const passwordConfirmChangeHandler = (e) => {
        const curPassword = e.target.value;
        console.log(curPassword, password.password);
        if (curPassword === password.password) {
            setPasswordConfirm({ passwordConfirm: curPassword, passwordConfirmMsg: "두 비밀번호가 일치합니다.", isPasswordConfirm: true });
        } else if (curPassword !== password.password) {
            setPasswordConfirm({ passwordConfirm: curPassword, passwordConfirmMsg: "두 비밀번호가 일치하지 않습니다", isPasswordConfirm: true });
        }
    }

    const birthChangeHandler = (e) => {
        const curDate = e.target.value;
        const selectedDate = new Date(curDate)
        const todayDate = new Date();
        if (selectedDate.getTime() > todayDate.getTime()) {
            setBirth({ birth: "", birthMsg: "미래에서 오셧군요", isBirth: false });
        } else {
            setBirth({ birthMsg: "", birth: curDate, isBirth: true });
        }
    }


    const duplicateHandler = (e) => {
        e.preventDefault();
        if (email.isEmail) {
            dispatch(duplicateCheck("client",email.email)).then((res)=> setEmail({...email, isEmail: true,emailMsg:res}) ).catch(err=>{
                setEmail({...email, isEmail: false,emailMsg:err})
            })
        }else{
            emailInputRef.current.focus();
            return;
        }
    }

    // console.log(award)
    const onSubmitHandler = async(e) => {
         e.preventDefault();
         
        if (!name.isName) {
            nameInputRef.current.focus();
            return
        } else if (!email.isEmail) {
            emailInputRef.current.focus();
            return
        } else if (!gender.isGender) {
            genderInputRef.current.focus();
            return
        } else if (!birth.isBirth) {
            birthInputRef.current.focus();
            return
        } else if (!phoneInputRef.current.value) {
            phoneInputRef.current.focus();
            return
        } else if(!password.isPassword || !passwordConfirm.isPasswordConfirm){
            passwordInputRef.current.focus();
        }

        console.log(birth.birth);
    

     
        const data=({
            name : name.name,
            email : email.email,
            password: password.password,
            birthday : birth.birth,
            gender : gender.gender,
            phone : phoneInputRef.current.value,
        })

        dispatch(signup("user", data)).then(res=>{
            alert("회원가입 성공");
            navigate("/login")
        }).catch((err)=>{
            alert("회원가입 실패")
        })
        
    }


    return (
        <div className={styles.Signup}>

            <div className={styles.header_box}>
                <div className={styles.header}>MPTI</div>
            </div>

            <div className={styles.form_title}>회원가입</div>

            <form className={styles.form_box}>
                <div className={styles.form_name} >
                    <label htmlFor='name'>성명</label>
                    <input ref={nameInputRef} type="text" id="name" onChange={nameChangeHandler} />
                    <p>{name.nameMsg}</p>
                </div>


                <div className={styles.form_gender} >
                    <label htmlFor='gender'>성별</label>
                    <select ref={genderInputRef} defaultValue={gender} id="gender" onChange={genderChangeHandler}>
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                    </select>
                    <p></p>
                </div>




                <div className={styles.form_email}>
                    <label htmlFor='email'>이메일</label>
                    <input ref={emailInputRef} type="email" id='email' onChange={emailChangeHandler} />
                    <button onClick={duplicateHandler}>중복확인</button>
                    <p>{email.emailMsg}</p>
                </div>

                <div className={styles.form_password}>
                    <label htmlFor='password' >비밀번호</label>
                    <input ref={passwordInputRef} type="password" name='password' onChange={passwordChangeHandler} />
                    <p>{password.passwordMsg}</p>
                </div>

                <div className={styles.form_passwordConfirm}>
                    <label htmlFor='password'>비밀번호 확인</label>
                    <input type="password" onChange={passwordConfirmChangeHandler} />
                    <p>{passwordConfirm.passwordConfirmMsg}</p>
                </div>

                <div className={styles.form_birth}>
                    <label htmlFor='birth'>생년월일</label>
                    <input ref={birthInputRef} type='date' onChange={birthChangeHandler} />
                    <p>{birth.birthMsg}</p>
                </div>

                <div className={styles.form_phone}>
                    <label htmlFor='phone'>핸드폰 번호</label>
                    <input ref={phoneInputRef} type='phone' />
                    <p>{birth.birthMsg}</p>
                </div>




                <button className={styles.form_sub_btn} onClick={onSubmitHandler}>회원가입</button>
            </form>

            <div className={styles.form_btn_box}>
                <button className={styles.form_sub_btn} onClick={()=> navigate(-1)}>뒤로가기</button>
            </div>
        </div>
    );
};

export default ClientSignup;
 