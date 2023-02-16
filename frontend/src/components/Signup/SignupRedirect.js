import React,{useEffect} from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
const SignupRedirect = () => {
    const navigate=useNavigate();
    const dispatch= useDispatch();
    
    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("access_token");
        const refreshToken = params.get("refresh_token");
        const isNewUser =JSON.parse(params.get("need_update"));
        const id = params.get("id");
        const email = params.get("email");
        console.log("1,", accessToken, "2,", refreshToken,"3,", isNewUser, "4,",id, "5,", email);
        
        
        //true면 유저상세정보로 false 바로홈으로
        if(accessToken){
            if(isNewUser){
                alert("로그인 성공 ! 처음 방문")
                dispatch(authActions.socialGetData({type:'data', payload:{roleToken: "user",role:"user", id: id, email: email}}));
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
                axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
                navigate("/user/mypage")
            }else{
                alert("로그인 성공 ! 이전에 방문한사람")
                dispatch(authActions.socialGetData({type:'data', payload:{roleToken: "user", id: id, email: email}}));
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
                axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
                navigate("/user/home")
            }
          
        }else{
           
        }
    },[])
   
    

    return (
        <div>
            소셜 로그인 리다이렉트
        </div>
    );
};

export default SignupRedirect;