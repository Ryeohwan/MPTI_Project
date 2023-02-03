import React,{useEffect} from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignupRedirect = () => {
    const navigate=useNavigate();
   
    
    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get("access_token");
        if(accessToken){
            alert("저장완료")
            localStorage.setItem("access_token", accessToken);
            axios.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
            axios.get("/api/user/api/auth/test")
            .then((res)=>{
                console.log(res);
                navigate("/home")
            }).catch((err)=>{

            })

        
            // axios.get()
            // navigate("/login")
        }else{
            alert("잘못된 접근")
            navigate("/login")
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