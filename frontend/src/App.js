// 사용 모듈or라이브러리
import { BrowserRouter, Routes, Route } from 'react-router-dom'

//유저 네비게이션 바(컴포넌트)
import ClientNavBar from './components/ClientNavBar/ClientNavBar'

// css module
import styles from './App.module.css'

// 라우터 페이지들
import Home from './pages/Home'
import ClientMySchedule from './pages/ClientMySchedule'
import ClientPTLog from './pages/ClientPTLog'
import ClientReservation from './pages/ClientReservation'
import ClientMyPage from './pages/ClientMyPage'


/*-----------------------------------코드 시작 부분-----------------------------------*/


export default function App(){
  return (
    <BrowserRouter>
      {/* 스타일 : 바탕화면 background 그라데이션 색깔 입히기. height=100% */}
      <div className={styles.background}>

        <header>
        {/* ClientNavbar 는 client의 네비게이션 바/ TrainerNavBar는 Trainer의 네비게이션 바 */}
          <ClientNavBar></ClientNavBar>
        </header>




        {/* 라우트 경로 목록들 */}
        <Routes>
          <Route path="/home" element={<Home/>}/>
          <Route path="/clientmyschedule" element={<ClientMySchedule/>}/>
          <Route path="/clientptlog" element={<ClientPTLog/>}/>
          <Route path="/clientreservation" element={<ClientReservation/>}/>
          <Route path="/clientmypage" element={<ClientMyPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>

  )
}
