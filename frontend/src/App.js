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


/*-----------------------------------코드 시작 부분-----------------------------------*/

export default function App(){
  // type 고객 => <ClientHeader>출력,  type 트레이너 => <TrainerHeader>출력
  const type = "client"
  // const type = "trainer"


  return (
      <div className="App">
        {type==="client"?<ClientHeader/>:null}
        {type==="trainer"?<TrainerHeader/>:null}
        {/* <ClientHeader/> */}
        {/* <TrainerHeader/> */}

                {/* 라우트 경로 목록들 */}
        <Routes>
          {/* 공통 */}
          <Route path="/home" element={<Home/>}/>

          {/* 회원 */}
          <Route path="/clientmyschedule" element={<ClientMySchedule/>}/>
          <Route path="/clientmylog" element={<ClientMyLog/>}/>
          <Route path="/clientmyreservation" element={<ClientMyReservation/>}/>
          <Route path="/clientmypage" element={<ClientMyPage/>}/>


          {/* 트레이너 */}
          <Route path="/trainermyclient" element={<TrainerMyClient/>}/>
          <Route path="/trainermyreservation" element={<TrainerMyReservation/>}/>
          <Route path="/trainermypage" element={<TrainerMyPage/>}/>

        </Routes>
      </div>
  )
}

// {/* ClientNavbar 는 client의 네비게이션 바/ TrainerNavBar는 Trainer의 네비게이션 바 */}
// {/* <NaverLogin></NaverLogin>
// <SignUP/> */}