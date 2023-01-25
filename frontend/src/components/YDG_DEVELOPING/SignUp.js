import useValidCheck from '../../hooks/useValidCheck'

export default function SignUP(){
  const [inputname, CheckNameValid] = useValidCheck(true);
  const [inputgender, CheckGenderValid] = useValidCheck(true);
  const [inputid, CheckIdValid] = useValidCheck(true);
  const [inputpw, CheckPwValid] = useValidCheck(true);
  const [inputpw2, CheckPw2Valid] = useValidCheck(true);
  const [inputbirth, CheckBirthValid] = useValidCheck(true);
  const [inputphone, CheckPhoneValid] = useValidCheck(true);
  const [inputprize, CheckPrizeValid] = useValidCheck(true);
  const [inputcert, CheckCertValid] = useValidCheck(true);
  const [inputresume, CheckResumeValid] = useValidCheck(true);
  // {inputbirth?(null):(<div>아이디오류</div>)}
  return(
<div>
    <form style={{display:"flex", flexDirection:"column"}}>
      <div>
        <label htmlFor="name">이름 :</label>
        <input id='name' name = 'name' placeholder="이름을 입력해주세요." onBlur={(event) => CheckNameValid({value: event.target.value, type:'NAME'})}></input>
      </div>
        {inputname}

      <div>
        <label htmlFor="gender">성별 :</label>
        <input id='gender' name = 'gender' placeholder="성별을 입력해주세요." onBlur={(event) => CheckGenderValid({value: event.target.value, type:'GENDER'})}></input>
      </div>
        {inputgender}

      <div>
        <label htmlFor="id">아이디 :</label>
        <input id='id' name = 'id' placeholder="아이디를 입력해주세요." onBlur={(event) => CheckIdValid({value: event.target.value, type:'ID'})}></input>  
      </div>
        {inputid}

      <div>
        <label htmlFor="pw">비밀번호 :</label>
        <input id='pw' name = 'pw' placeholder="비밀번호를 입력해주세요." onBlur={(event) => CheckPwValid({value: event.target.value, type:'PW'})}></input>
      </div>
        {inputpw}
      
      <div>
        <label htmlFor="pw2">비밀번호확인 :</label>
        <input id='pw2' name = 'pw2' placeholder="비밀번호를 입력해주세요." onBlur={(event) => CheckPw2Valid({value: event.target.value, type:'PW2'})}></input>
      </div>
        {inputpw2}
      
      <div>
        <label htmlFor="birth">생년월일 :</label>
        <input id='birth' name = 'birth' placeholder="생년월일을 입력해주세요." onBlur={(event) => CheckBirthValid({value: event.target.value, type:'BIRTH'})}></input>
      </div>
        {inputbirth}
      <div>
        <label htmlFor="phone">전화번호 :</label>
        <input id='phone' name = 'phone' placeholder="전화번호를 입력해주세요." onBlur={(event) => CheckPhoneValid({value: event.target.value, type:'PHONE'})}></input>
      </div>
        {inputphone}

      <div>
        <label htmlFor="prize">수상경력 :</label>
        <input id='prize' name = 'prize' placeholder="수상경력을 입력해주세요." onBlur={(event) => CheckPrizeValid({value: event.target.value, type:'PRIZE'})}></input>
      </div>
        {inputprize}

      <div>
        <label htmlFor="cert">자격증 :</label>
        <input id='cert' name = 'cert' placeholder="자격증을 입력해주세요." onBlur={(event) => CheckCertValid({value: event.target.value, type:'CERT'})}></input>
      </div>
        {inputcert}

      <div>
        <label htmlFor="resume">이력 :</label>
        <input id='resume' name = 'resume' placeholder="이력을 입력해주세요." onBlur={(event) => CheckResumeValid({value: event.target.value, type:'RESUME'})}></input>
      </div>
        {inputresume}
    </form>
</div>
  )
}