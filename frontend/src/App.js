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
import ClientSignup from "./components/Signup/ClientSignup";
import TrainerSignup from "./components/Signup/TrainerSignup";
import Lesson from "./pages/Common/Lesson";
import ClientRealReservation from "./pages/Client/ClientRealReservation";
import ClientPayResult from "./pages/Client/ClientPayResult";

/*-----------------------------------코드 시작 부분-----------------------------------*/

export default function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );

  const [roleToken, setRoleToken] = useState(localStorage.getItem("mpti_role"));
  // const { isLoading } = useSelector((state) => state.admin);
  const { isLoading } = useSelector((state) => state.etc);
  const admin = useSelector((state) => state.admin);

  const { role } = useSelector((state) => state.auth);
  console.log(role);
  console.log(roleToken);

  return (
    <div className="App">
      {isLoading ? <BasicLoadingSpinner /> : null}
        <Routes>
          <Route path="/trainer/*" element={<TrainerHeader/>} />
          <Route path="/user/*" element={<ClientHeader/>} />
        </Routes>


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/trainer/home" element={<Home />} />
        <Route path="/trainer/myclient" element={<TrainerMyClient />} />
        <Route
          path="/trainer/myreservation"
          element={<TrainerMyReservation />}
        />
        <Route path="/trainer/mypage" element={<TrainerMyPage />} />
        <Route
          path="/trainer/trainerdetail"
          element={<ClientTrainerDetail />}
        />
        <Route path="/lesson" element={<Lesson />} />

        <Route path="/oauth2/redirect" element={<SignupRedirect />} />
        <Route path="/trainersignup" element={<TrainerSignup />} />
        <Route path="/clientsignup" element={<ClientSignup />} />
        <Route path="/select" element={<SignupSelect />} />
        
        
        <Route path="/user/myschedule" element={<ClientMySchedule />} />
        <Route path="/user/mylog" element={<ClientMyLog />} />
        <Route path="/user/myreservation" element={<ClientMyReservation />} />
        <Route path="/user/mypage" element={<ClientMyPage />} />
        <Route path="/user/trainerdetail" element={<ClientTrainerDetail />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/trainerdetail/realreservation" element={<ClientRealReservation/>} />
        <Route path="/user/payresult" element={<ClientPayResult/>} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/user/home" element={<Home/>} />

        <Route path="/trainer/myclient" element={<TrainerMyClient />} />
        <Route
          path="/trainer/myreservation"
          element={<TrainerMyReservation />}
        />
        <Route path="/trainer/mypage/*" element={<TrainerMyPage />} />
        <Route path="/admin/*" element={<ManagerHome />} />
        <Route element={<Landing />} />
      </Routes>
    </div>
  );
}
