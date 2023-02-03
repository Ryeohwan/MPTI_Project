// 라이브러리
import {Routes, Route} from 'react-router-dom';
//CSS
import './App.css';
// 컴포넌트
import ClientHeader from './components/Header/ClientHeader';
import TrainerHeader from './components/Header/TrainerHeader';
// 라우트 페이지
import Home from './pages/Common/Home';
import ClientMySchedule from './pages/Client/ClientMySchedule';
import ClientMyLog from './pages/Client/ClientMyLog';
import ClientMyReservation from './pages/Client/ClientMyReservation';
import ClientMyPage from './pages/Client/ClientMyPage';
import TrainerMyClient from './pages/Trainer/TrainerMyClient';
import TrainerMyReservation from './pages/Trainer/TrainerMyReservation';
import TrainerMyPage from './pages/Trainer/TrainerMyPage';
import ClientTrainerDetail from './pages/Client/ClientTrainerDetail';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import ManagerAccountManagement from './pages/Manager/ManagerAccountManagement'
import ManagerHome from './pages/Manager/ManagerHome'
import ManagerReportApproval from './pages/Manager/ManagerReportApproval'
import ManagerSignupApproval from './pages/Manager/ManagerSignupApproval'
import SignupSelect from './components/Signup/SignupSelect'
import { useState } from 'react';
import Landing from './pages/Landing/Landing';
import { Link } from 'react-router-dom';
/*-----------------------------------코드 시작 부분-----------------------------------*/

export default function App(){
  const [type, setType] = useState('')
  localStorage.setItem('token','123')

  return (
      <div className="App">
        {/* {localStorage.getItem('token') ? <ClientHeader/> : <랜딩페이지/>} */}
        {/* 테스트용 이동 버튼 삭제시 import link도 삭제 */}
        <div style={{display:'flex', flexDirection:'column', position:'absolute', zIndex:100, top:0, left:0 }}>
          <Link to='/'><button onClick={()=>setType('')}>비회원</button></Link>
          <Link to='/home'><button onClick={()=>setType('trainer')}>트레이너</button></Link>
          <Link to='/home'><button onClick={()=>setType('client')}>고객</button></Link>
          <Link to='/manager'><button onClick={()=>setType('manager')}>관리자</button></Link>
          <span style={{color:'white'}}>상태:{type?type:'not user'}</span>
        </div>
        {type==="client"?<ClientHeader/>:null}
        {type==="trainer"?<TrainerHeader/>:null}

        
        {/* 라우트 경로 목록들 */}
        <Routes>

          {/* 공통 */}
          <Route path="/" element={<Landing/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/select" element={<SignupSelect/>}/>

          {/* 회원 */}
          <Route path="/clientmyschedule" element={<ClientMySchedule/>}/>
          <Route path="/clientmylog" element={<ClientMyLog/>}/>
          <Route path="/clientmyreservation" element={<ClientMyReservation/>}/>
          <Route path="/clientmypage" element={<ClientMyPage/>}/>
          <Route path="/clienttrainerdetail" element={<ClientTrainerDetail/>}/>

          {/* 트레이너 */}
          <Route path="/trainermyclient" element={<TrainerMyClient/>}/>
          <Route path="/trainermyreservation" element={<TrainerMyReservation/>}/>
          <Route path="/trainermypage/*" element={<TrainerMyPage/>}/>

          {/* 관리자 */}
          <Route path="/manager/*" element={<ManagerHome/>}/>
        </Routes>

      </div>
  )
}

// {/* ClientNavbar 는 client의 네비게이션 바/ TrainerNavBar는 Trainer의 네비게이션 바 */}
// {/* <NaverLogin></NaverLogin>
// <SignUP/> */}