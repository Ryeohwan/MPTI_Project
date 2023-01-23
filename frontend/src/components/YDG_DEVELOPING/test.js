//https://2mojurmoyang.tistory.com/193
import React, {useEffect,useState} from 'react'
const {naver} = window;

const NAVER_CLIENT_ID = "TLuA7FXvBfYifB1NhcQb";
const CALLBACKURL = "http://localhost:3000";


console.log('헬러')
export default function NaverLogin(){
  const [user, setUser] = useState(null);
  //naver_Login 버튼, 객체 만들기
  const naverLogin = new naver.LoginWithNaverId({
    clientId: NAVER_CLIENT_ID,
    callbackUrl: CALLBACKURL,
    isPopup: true,
    loginButton: {
      color: "green",
      type: 3,
      height: 50,
    },
  });
  //유저 정보 가져오기 함수
async function getUser() {
  await naverLogin.getLoginStatus((status) => {
    console.log(`로그인?:${status}`);
    if(status) {
      setUser({...naverLogin.user})
      window.opener.location.href = "http://localhost:3000/naver";
      window.close();
    }
  })
}
  // 로그아웃 하기 (로칼 스토리지 제거 + 리로드)
  function naverLogout () {
    localStorage.removeItem("com.naver.nid.access_token");
    localStorage.removeItem("com.naver.nid.oauth.state_token");
    window.location.reload();
  }
  //네이버 버튼 생성 함수와 유저정보 가져오기 함수 실행.
  useEffect(() => {
    naverLogin.init();
    console.log("init!");
    getUser();
  }, []);
  console.log(user)



  return (
    <div>
      {user? (
      <div>
      <h2>네이버 로그인 성공!</h2>
      <h3>사용자 이름</h3>
      <div>{user.name}</div>
      <h3>사용자 이메일</h3>
      <div>{user.email}</div>
      <h3>사용자 전화번호</h3>
      <div>{user.mobile}</div>
      <h3>사용자 성별</h3>
      <div>{user.gender}</div>
      <h3>사용자 태어난 년도</h3>
      <div>{user.birthyear}</div>
      <h3>사용자 태어난 월/일</h3>
      <div>{user.birthday}</div>
      <button onClick={naverLogout}>로그아웃</button>
      </div>

      ):(
        <div id='naverIdLogin'>
        </div>
      )}

  </div>
  )
}