// 라이브러리
import { Routes, Route, Navigate } from "react-router-dom";
//CSS
import "./App.css";
// 컴포넌트
import ClientHeader from "./components/Header/ClientHeader";
import TrainerHeader from "./components/Header/TrainerHeader";
// 라우트 페이지
import Home from "./pages/Common/Home";
import ClientMySchedule from "./pages/Client/ClientMySchedule";
import ClientMyLog from "./pages/Client/ClientMyLog";
import ClientMyReservation from "./pages/Client/ClientMyReservation";
import ClientMyPage from "./pages/Client/ClientMyPage";
import TrainerMyClient from "./pages/Trainer/TrainerMyClient";
import TrainerMyReservation from "./pages/Trainer/TrainerMyReservation";
import TrainerMyPage from "./pages/Trainer/TrainerMyPage";
import ClientTrainerDetail from "./pages/Client/ClientTrainerDetail";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ManagerAccountManagement from "./pages/Manager/ManagerAccountManagement";
import ManagerHome from "./pages/Manager/ManagerHome";
import ManagerReportApproval from "./pages/Manager/ManagerReportApproval";
import ManagerSignupApproval from "./pages/Manager/ManagerSignupApproval";
import SignupSelect from "./components/Signup/SignupSelect";
import { useState, useEffect } from "react";
import Landing from "./pages/Landing/Landing";
import SignupRedirect from "./components/Signup/SignupRedirect";
import BasicLoadingSpinner from "./components/Loading/BasicLoadingSpinner";
import { useSelector } from "react-redux";
import ClientRealReservation from "./pages/Client/ClientRealReservation";


/*-----------------------------------코드 시작 부분-----------------------------------*/

export default function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [roleToken, setRoleToken] = useState(
    localStorage.getItem("mpti_role")
  );
  const { isLoading } = useSelector((state) => state.admin);
  const { role } = useSelector((state) => state.auth);
    console.log(role);
    console.log(roleToken);

  return (
    <div className="App">
      {isLoading ? <BasicLoadingSpinner /> : null}

        <Routes>
          <Route path="/trainer/*" element={<TrainerHeader/>} />
          <Route path="/client/*" element={<ClientHeader/>} />
        </Routes>


        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/trainer/home" element={<Home/>} />
        <Route path="/trainer/myclient" element={<TrainerMyClient />} />
        <Route path="/trainer/myreservation" element={<TrainerMyReservation />} />
        <Route path="/trainer/mypage" element={<TrainerMyPage />} />
       

        <Route path="/oauth2/redirect" element={<SignupRedirect />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/select" element={<SignupSelect />} />
        
        
        <Route path="/client/myschedule" element={<ClientMySchedule />} />
        <Route path="/client/mylog" element={<ClientMyLog />} />
        <Route path="/client/myreservation" element={<ClientMyReservation />} />
        <Route path="/client/mypage" element={<ClientMyPage />} />
        <Route path="/client/trainerdetail" element={<ClientTrainerDetail />} />
        <Route path="/client/trainerdetail/realreservation" element={<ClientRealReservation/>} />
        {/* <Route path="/home" element={<Home />} /> */}

        <Route path="/trainer/myclient" element={<TrainerMyClient />} />
        <Route path="/trainer/myreservation" element={<TrainerMyReservation />} />
        <Route path="/trainer/mypage/*" element={<TrainerMyPage />} />
        <Route path="/manager/*" element={<ManagerHome />} />
        <Route element={<Landing />}/>
      
      </Routes>
    </div>
  );
}
