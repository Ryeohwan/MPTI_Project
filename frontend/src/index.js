// 사용 모듈or라이브러리
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 라우터 페이지들
import Home from './pages/Home'
import ClientMySchedule from './pages/Client/ClientMySchedule'
import ClientMyLog from './pages/Client/ClientMyLog'
import ClientMyReservation from './pages/Client/ClientMyReservation'
import ClientMyPage from './pages/Client/ClientMyPage'
import TrainerMyClient from './pages/Trainer/TrainerMyClient'
import TrainerMyReservation from './pages/Trainer/TrainerMyReservation'
import TrainerMyPage from './pages/Trainer/TrainerMyPage'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div>

    <BrowserRouter> 
      <App />

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
    </BrowserRouter>
  </div>
);
