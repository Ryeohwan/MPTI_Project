import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "",
    email: "",
    phone: "",
    image: "",
    role: "",
    isLoading: false,
    isLoggedIn:false,
    error: ""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = true;
            state.role= action.payload;
        },
        loginFailure: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.isLoading = false;
            state.isLoggedIn = false;
        },
        logoutFailure: (state, action) => {
            state.isLoading = false;
            state.isLoggedIn = false;
            state.error = action.payload;
        },signupRequest: (state) => {
            state.isLoading = true;
        },
        signupSuccess: (state) => {
            state.isLoading = false;
        },signupFailure: (state, action) => {
            state.isLoading = false;
        },
    },
});



export const login = (email, password) => async (dispatch) => {
        dispatch(authActions.loginRequest());
    try {
        const response = await axios.post("/api/auth/login", { email, password });
        localStorage.setItem("access_token", response.headers["authorization"]);
        localStorage.setItem("refresh_token", response.headers["refresh-token"]);
        const role=response.headers["role"] === "[ROLE_TRAINER]"? "trainer": response.headers["role"] === "[ROLE_CLIENT]"? "client": "manager"; 
        localStorage.setItem("mpti_role", role);
        console.log(role);
        dispatch(authActions.loginSuccess(role));
    } catch (error) {
        dispatch(authActions.loginFailure(error));
    }
};

export const logout = () => async(dispatch)=>{
    try {
        const accessToken = localStorage.getItem('access_token');
        const refreshToken = localStorage.getItem('refresh_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('mpti_role');
        axios.defaults.headers.common['authorization'] = accessToken;
        axios.defaults.headers.common['refresh-token'] = refreshToken;
        const response= await axios.post("/api/auth/logout");
        console.log(response);
        console.log("로그아웃 성공");
        dispatch(authActions.logoutSuccess());
    } catch (error) {
        console.log("로그아웃 실패");
        dispatch(authActions.logoutFailure(error));
    }
}


export const signup = (type, userInfo)=> async(dispatch) =>{
    dispatch(authActions.signupRequest());
    try {
        const response = await axios.post(`/api/${type}/join`, userInfo);
        console.log(response);
        console.log("회원가입 성공");
        dispatch(authActions.signupSuccess());
    } catch (error) {
        console.log(error);
        console.log("회원가입 실패");
        dispatch(authActions.signupFailure());
    }
}

export const duplicateCheck = (type,email) => async(dispatch)=>{
    try {
        const response= await axios.get(`/api/${type}/duplicate/${email}`);
        console.log(response);
        console.log("중복확인 성공");
        return "중복된 아이디가 없습니다";
        // dispatch(authActions.duplicateMsg("중복된 아이디가 없습니다."));
    } catch (error) {
        // console.log(error.response);
        return "중복된 아이디가 있습니다";
        // dispatch(authActions.duplicateMsg("중복된 아이디가 있습니다."));
    }
}



export const authActions = authSlice.actions;
export default authSlice.reducer;
