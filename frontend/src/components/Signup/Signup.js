import axios from 'axios';
import React, { useRef, useState } from 'react';

const Signup = () => {
  const [name,setName] = useState({name:"", nameMsg:"", isName: true});
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState({email:"", emailMsg:"", isEmail: true});
  const [password, setPassword]= useState({password: "", passwordMsg:"", isPassword: true});
  const [passwordConfirm, setPasswordConfirm]= useState({passwordConfirm: "",passwordConfirmMsg:"", isPasswordConfirm: true});

    const nameChangeHandler = (e)=>{
        const curName= e.target.value;
        setName({...name, name: curName });
        console.log(name);
        if(curName.length>30){
            setName({...name, name: curName,Msg: "이름은 30자 이하로 입력해주세요.", isName:true});
        }else {
            setName({...name, name: curName,nameMsg: "", isName:false});
        }
    }

const genderChangeHandler =(e)=>{
    const curGender=e.target.value;
    setGender(curGender);
}

const emailChangeHandler = (e)=>{
    const curEmail = e.target.value;
    const emailValidCheck = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    setEmail({...email, email: curEmail});
    if(!emailValidCheck.test(curEmail)){
        setEmail({...email, emailMsg:"이메일 형식을 갖춰주세요.",isEmail: true})
    }else{
        setEmail({...email, emailMsg:"",isEmail: false})
    }
}

const passwordChangeHandler = (e) =>{
    const curPassword = e.target.value;
    console.log(password);
    setPassword({...password, password:e.target.value, });
    const passwordValidCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{9,16}$/;
    if(!passwordValidCheck.test(curPassword)){
        setPassword({...password, passwordMsg: "특수문자, 영어, 숫자를 포함한 9-16사이의 값을 입력하세요", isPassword: true});
    }else {
        setPassword({...password, passwordMsg: "", isPassword: false});
    }
}



const passwordConfirmChangeHandler = (e) =>{
    const curPassword = e.target.value;
    setPasswordConfirm({...passwordConfirm, passwordConfirm:"sdw",  isPasswordConfirm: true});
    console.log(passwordConfirm);
    if (curPassword!==password.password){
        setPasswordConfirm({...passwordConfirm, passwordConfirmMsg: "두 비밀번호가 일치하지 않습니다.", isPasswordConfirm: true});
    }else if(curPassword!==password.password){
        setPasswordConfirm({...passwordConfirm, passwordConfirmMsg: "두 비밀번호가 일치합니다.", isPasswordConfirm: true});
    }
}

const testDuplicateChk = (body)=>{
    console.log(body);
    axios.post("/login/duplication-check", body ).then(res=>{
        console.log(res.data);
    }).catch((error)=>{
        console.log(error)
    })
}
const duplicateHandler=()=>{
    if (email.isEmail){
        console.log();
        console.log("test안됨");
        return;
    }else{
        console.log(email.email);
        console.log("test 됨");
        testDuplicateChk({email:email.email})
    }
}

const onSubmitHandler= (e)=>{
    e.preventDefault();
    console.log(name, gender);
}


return (
    <div className='Signup'>
              
        <form onSubmit={onSubmitHandler}>
        <div>
            <label htmlFor='name'>성명</label>
            <input type="text" id="name" onChange={nameChangeHandler}/>
            {name.isName ? <p>{name.nameMsg}</p>: ""}


            <label htmlFor='gender'>성별</label>
            <select id="gender"  onChange={genderChangeHandler}>
                <option value="male">남성</option>
                <option value="female">여성</option>
            </select>
        </div>


        <div>
            <label htmlFor='email'>이메일</label>
            <input type="email" id='email' onChange={emailChangeHandler} />
            {email.isEmail ? <p>{email.emailMsg}</p>: ""}
            <button onClick={duplicateHandler}>중복확인</button>
        </div>

        <div>
            <label htmlFor='password' >비밀번호</label>
            <input type="password" name='password' onChange={passwordChangeHandler}/>
            {password.isPassword ? <p>{password.passwordMsg}</p>: ""}
        </div>

        <div>
            <label htmlFor='password'>비밀번호 확인</label>
            <input type="password"  onChange={passwordConfirmChangeHandler} />
            <p>{passwordConfirm.passwordConfirmMsg}</p>
        </div>

        {/* <div>
            <label htmlFor='birth'>생년월일</label>
            <input type='date' value={birth}  onChange={birthChangeHandler}/>
        </div>

        

        
        <div>
            <label htmlFor='prize'>수상이력</label>
            <input type="text" value={awards.name} /> <input type="text" value={awards.company}/> <input type="text" value={awards.date}/>
        </div>

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