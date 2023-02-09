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
/*-----------------------------------코드 시작 부분-----------------------------------*/

export default function App() {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("access_token")
  );
  const [roles, setRole] = useState("client");
  const { isLoading } = useSelector((state) => state.admin);
  const { isLoggedIn, email, role } = useSelector((state) => state.auth);
  console.log(email,role);
  return (
    <div className="App">
      {isLoading ? <BasicLoadingSpinner /> : null}

      <Routes>
        {!accessToken && (
          <>
            {" "}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/oauth2/redirect" element={<SignupRedirect />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/select" element={<SignupSelect />} />
          </>
        )}

        {accessToken && roles === "client" ? <></> : <></>}

        <Route path="/clientmyschedule" element={<ClientMySchedule />} />
        <Route path="/clientmylog" element={<ClientMyLog />} />
        <Route path="/clientmyreservation" element={<ClientMyReservation />} />
        <Route path="/clientmypage" element={<ClientMyPage />} />
        <Route path="/clienttrainerdetail" element={<ClientTrainerDetail />} />
        <Route path="/home" element={<Home />} />

        <Route path="/trainermyclient" element={<TrainerMyClient />} />
        <Route
          path="/trainermyreservation"
          element={<TrainerMyReservation />}
        />
        <Route path="/trainermypage/*" element={<TrainerMyPage />} />
        <Route path="/manager/*" element={<ManagerHome />} />
      </Routes>
    </div>
  );
}
