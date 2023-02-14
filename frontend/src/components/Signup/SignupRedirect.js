import React,{useEffect} from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignupRedirect = () => {
    const navigate=useNavigate();
   
    
    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const isNewUser = params.get("need_update");
        //true면 유저상세정보로 false 바로홈으로
        if(accessToken && isNewUser){
            alert("로그인 성공 !")
            localStorage.setItem("access_token", accessToken);
            localStorage.setItem("refresh_token", refreshToken);
            axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
            navigate("/user/mypage")
        }else if(accessToken && !isNewUser){
            console.log("");
            navigate("/user/home")
        }
    },[])
   
    

    return (
        <div>
            여긴 다시 받는곳입니다.dwdwdssssssssssssssssssssssssssssss
            @@ 여긴 다시 받는곳입니다.dwdwdssssssssssssssssssssssssssssss
            @@ 여긴 다시 받는곳입니다.dwdwdssssssssssssssssssssssssssssss
            @@ 여긴 다시 받는곳입니다.dwdwdssssssssssssssssssssssssssssss
            @@ 여긴 다시 받는곳입니다.dwdwdssssssssssssssssssssssssssssss
            @@ 여긴 다시 받는곳입니다.dwdwdssssssssssssssssssssssssssssss
            @@
        </div>
    );
};

export default SignupRedirect;