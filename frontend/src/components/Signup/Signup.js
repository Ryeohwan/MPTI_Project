import axios from 'axios';
import React, { useRef, useState } from 'react';
import styles from "./Signup.module.css"
const Signup = () => {
  const [name,setName] = useState({name:"", nameMsg:"", isName: false});
  const [gender, setGender] = useState({gender:"", isGender: false});
  const [email, setEmail] = useState({email:"", emailMsg:"", isEmail: undefined});
  const [password, setPassword]= useState({password: "", passwordMsg:"", isPassword: true});
  const [passwordConfirm, setPasswordConfirm]= useState({passwordConfirm: "",passwordConfirmMsg:"", isPasswordConfirm: true});
  const [birth, setBirth] = useState({birth: "", birthMsg:"",isBirth: false});
  const [award, setAward] = useState({name: "", company:"", date:""});
  const nameInputRef= useRef();
  const emailInputRef= useRef();
  const passwordInputRef= useRef();
  const genderInputRef = useRef();
  const birthInputRef = useRef();
  

 const nameChangeHandler = (e)=>{
        const curName= e.target.value;
        setName({...name, name: curName });
        console.log(name);
        if(curName.length>30){
            setName({...name, name: curName,nameMsg: "이름은 30자 이하로 입력해주세요.", isName:false});
        }else {
            setName({...name, name: curName,nameMsg: "", isName:true});
        }
    }

const genderChangeHandler =(e)=>{
    const curGender=e.target.value;
    setGender({gender: curGender, isGender:true});
}

const emailChangeHandler = (e)=>{
    const curEmail = e.target.value;
    const emailValidCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    if(!emailValidCheck.test(curEmail)){
         setEmail({email: curEmail, emailMsg:"이메일 형식을 갖춰주세요.",isEmail: false})
    }else{
         setEmail({email: curEmail, emailMsg:"",isEmail: true})
     }
}

const passwordChangeHandler = (e) =>{
    const curPassword = e.target.value;
    const passwordValidCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,16}$/;
    if(!passwordValidCheck.test(curPassword)){
        setPassword({password: curPassword, passwordMsg: "특수문자, 영어, 숫자를 포함한 9-16사이의 값을 입력하세요", isPassword: false});
    }else {
        setPassword({password: curPassword, passwordMsg: "", isPassword: true});
    }
}


const passwordConfirmChangeHandler = (e) =>{
    const curPassword = e.target.value;
    console.log(curPassword, password.password);
    if (curPassword==password.password){
        setPasswordConfirm({passwordConfirm: curPassword, passwordConfirmMsg: "두 비밀번호가 일치합니다.", isPasswordConfirm: true});
    }else if(curPassword!==password.password){
        setPasswordConfirm({passwordConfirm: curPassword, passwordConfirmMsg: "두 비밀번호가 일치하지 않습니다", isPasswordConfirm: true});
    }
}

const birthChangeHandler = (e)=>{
    const curDate= e.target.value;
    const selectedDate = new Date(curDate)
    const todayDate =new Date();
    if(selectedDate.getTime() > todayDate.getTime()){
        setBirth({birth: "", birthMsg: "미래에서 오셧군요", isBirth: false});
    }else{
        setBirth({birthMsg: "", birth: curDate, isBirth: true});
    }
}

const awardNameChangeHandler= (e=>{
    setAward({...award, name:e.target.value})
})

const awardCompanyChangeHandler= (e=>{
    setAward({...award, company:e.target.value})
})

const awardDateChangeHandler= (e=>{
    setAward({...award, date:e.target.value})
})
console.log(award);

const testDuplicateChk = (body)=>{
    console.log(body);
    axios.post("/login/duplication-check",body).then(res=>{
        console.log(res.data);
    }).catch((error)=>{
        console.log(error)
    })
}
const duplicateHandler=()=>{
    if (email.isEmail){
        testDuplicateChk({email:email.email})
    }else{
        console.log("test안됨");
        return;
    }
}

const onSubmitHandler= (e)=>{

    e.preventDefault();
    if(!name.isName){
        nameInputRef.current.focus();
        return
    }else if(!email.isEmail){
        emailInputRef.current.focus();
        return
    }else if(!gender.isGender){
        genderInputRef.current.focus();
        return
    }else if(!birth.isBirth){
        birthInputRef.current.focus();
        return
    }

    const newObj ={
        name: name.name,
        email: email.email,
        password : password.password,
        birth: birth.birth,
        award: {
            name: award.name,
            company: award.company,
            date: award.date
        }
    }
    console.log(newObj);
}


return (
    <div className={styles.Signup}>
            <div className={styles.header_box}>
                <div className={styles.header}>MPTI</div>
            </div>

        <form onSubmit={onSubmitHandler}>
        <div>
            <label htmlFor='name'>성명</label>
            <input ref={nameInputRef} type="text" id="name" onChange={nameChangeHandler}/>
            <p>{name.nameMsg}</p>


            <label htmlFor='gender'>성별</label>
            <select ref={genderInputRef}id="gender" onChange={genderChangeHandler}>
                <option value="male">남성</option>
                <option value="female">여성</option>
            </select>
        </div>


        <div>
            <label htmlFor='email'>이메일</label>
            <input ref={emailInputRef} type="email" id='email' onChange={emailChangeHandler} />
            <p>{email.emailMsg}</p>
            <button onClick={duplicateHandler}>중복확인</button>
        </div>

        <div>
            <label htmlFor='password' >비밀번호</label>
            <input ref={passwordInputRef} type="password" name='password' onChange={passwordChangeHandler}/>
            <p>{password.passwordMsg}</p>
        </div>

        <div>
            <label htmlFor='password'>비밀번호 확인</label>
            <input type="password"  onChange={passwordConfirmChangeHandler} />
            <p>{passwordConfirm.passwordConfirmMsg}</p>
        </div>

        <div>
            <label htmlFor='birth'>생년월일</label>
            <input ref={birthInputRef} type='date' onChange={birthChangeHandler}/>
            <p>{birth.birthMsg}</p>
        </div>

        

        
        <div>
            <label htmlFor='prize'>수상이력</label>
            <input type="text" onChange={awardNameChangeHandler}/> <input type="text" onChange={awardCompanyChangeHandler} /> <input type="text" onChange={awardDateChangeHandler} />
        </div>
{/* 
        <div>
            <label htmlFor=''>관련 자격증</label>
            <input type="text" value={certificate.name} /> <input type="text" value={certificate.company}/> <input type="text" value={certificate.date}/>
        </div>

        <div>
            <label htmlFor='phone'>경력</label>
            <input type="text" value={career.name} /> <input type="text" value={career.company}/> <input type="text" value={career.date}/>
        </div> */}
        
        <button>회원가입</button>
        

    

            
        </form>

    </div>
);
};

export default Signup;