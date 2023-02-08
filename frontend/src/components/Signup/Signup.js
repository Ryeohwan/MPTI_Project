import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import auth, { duplicateCheck } from '../../store/auth';
import {signup} from '../../store/auth';
import styles from "./Signup.module.css"
const Signup = () => {
    const [name, setName] = useState({ name: "", nameMsg: "", isName: false });
    const [gender, setGender] = useState({ gender: "male", isGender: false });
    const [email, setEmail] = useState({ email: "", emailMsg: "", isEmail: undefined });
    const [password, setPassword] = useState({ password: "", passwordMsg: "", isPassword: true });
    const [passwordConfirm, setPasswordConfirm] = useState({ passwordConfirm: "", passwordConfirmMsg: "", isPasswordConfirm: true });
    const [birth, setBirth] = useState({ birth: "", birthMsg: "", isBirth: false });
    const [award, setAward] = useState({ award1: "", award2: "", award3: ""});
    const [certificate, setCertificate] = useState({ certificate1: "",certificate2: "", certificate3: ""});
    const [career, setCareer] = useState({ career1: "", career2: "", career3: ""});
    const [file, setFile] = useState();

    
    const dispatch = useDispatch();
    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const genderInputRef = useRef();
    const birthInputRef = useRef();
    const phoneInputRef = useRef();

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
            dispatch(duplicateCheck("trainer",email.email)).then((res)=> setEmail({...email, emailMsg:res}));
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
        }

    
        // 회원가입 진행시 경력 수상등은 배열 문자열화
        const awards = JSON.stringify([award.award1,award.award2,award.award3])
        const license =JSON.stringify([certificate.certificate1,certificate.certificate2,certificate.certificate3])
        const careers =JSON.stringify([career.career1, career.career2, career.career3]);
     
        const data=({
            name : name.name,
            email : email.email,
            password: password.password,
            birthday : birth.birth,
            gender : gender.gender,
            phone : phoneInputRef.current.value,
            awards :  awards,
            license :   license,
            career : careers
        })

        dispatch(signup("trainer", data))
      
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
                    <select ref={genderInputRef} defaultValue={"male"} id="gender" onChange={genderChangeHandler}>
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




                <div className={styles.form_prize}>
                    <label htmlFor='prize'>수상(선택)</label>
                    <input type="text" defaultValue={award.award1} onChange={e=> setAward({...award,award1: e.target.value})} />
                    <input type="text" defaultValue={award.award2} onChange={e=> setAward({...award,award2: e.target.value})} />
                    <input type="text" defaultValue={award.award3} onChange={e=> setAward({...award,award3: e.target.value})} />
                    <p></p>
                </div>

                <div className={styles.form_certificate}>
                    <label htmlFor='certificate'>자격증(선택)</label>
                    <input type="text" defaultValue={certificate.certificate1} onChange={e=> setCertificate({...certificate,certificate1: e.target.value})} />
                    <input type="text" defaultValue={certificate.certificate2} onChange={e=> setCertificate({...certificate,certificate2: e.target.value})} />
                    <input type="text" defaultValue={certificate.certificate3} onChange={e=> setCertificate({...certificate,certificate3: e.target.value})} />
                    <p></p>
                </div>

                <div className={styles.form_career}>
                    <label htmlFor='career'>경력(선택)</label>
                    <input type="text" defaultValue={career.career1} onChange={e=>setCareer({...career, career1: e.target.value})}/>
                    <input type="text" defaultValue={career.career2} onChange={e=>setCareer({...career, career2: e.target.value})} />
                    <input type="text" defaultValue={career.career3} onChange={e=>setCareer({...career, career3: e.target.value})}/>
                    <p></p>
                </div>
                <button className={styles.form_sub_btn} onClick={onSubmitHandler}>회원가입</button>
            </form>

            <div className={styles.form_btn_box}>
                <button className={styles.form_sub_btn} >뒤로가기</button>
            </div>
        </div>
    );
};

export default Signup;
        // const formData = new FormData();
        // formData.append('email', "vksek222@gmail.com");
        // formData.append('file', file);
        // console.log(file)
     
        // axios.post('/api/user/upload', formData).then(res => {
        //     console.log(res);
        // })
        // const fileChangedHandler = (e) => {
        //     const file = e.target.files;
        //     //console.log(file);
        //     setFile(file[0]);
        // }