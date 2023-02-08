import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
}


const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        dataRequest: (state) => {
            state.isLoading = true;
        },
        dataSuccess: (state) => {
            state.isLoading = false;
            //state.isLoggedIn = true;
        },
        dataFailure: (state, action) => {
            state.isLoading = false;
            //state.isLoggedIn = false;
            //state.error = action.payload;
        },

    },
});


// 관리자 페이지 가입신청 목록 API
export const signupTrainerList = (pagenum) => async(dispatch)=>{
        dispatch(adminActions.dataRequest())
    try {
        const response=await (await axios.get(`/api/trainer/application/list/${pagenum}`)).data.content;
        console.log(response)
        console.log("가입승인 목록 리스트 불러오기 성공");
        dispatch(adminActions.dataSuccess())
        return response;
        
    } catch (error) {
        console.log(error, "가입승인 목록 리스트 불러오기 실패");
        dispatch(adminActions.dataFailure())
        return;
    }
}

// 관리자 페이지 가입 승인/반려 API, 인자로 {email: "", approved: true/false 기입}
export const signupApproval = (choice) => async(dispatch)=>{
    dispatch(adminActions.dataRequest())
    try {
        const response=await axios.post(`/api/trainer/application/process`,choice);
        const data= response;
        console.log(data, "가입승인/반려 성공");
        dispatch(adminActions.dataSuccess())
        return data;
    } catch (error) {
        console.log(error, "가입승인/반려 실패");
        dispatch(adminActions.dataFailure())
    }
}
// 신고목록 API
export const reportList = () => async(dispatch)=>{
    dispatch(adminActions.dataRequest())
    try {
        const response=await axios.get("/api/business/opinion/report/list/0");
        const data= response.data;
        console.log(data, "신고목록 불러오기 성공");
        dispatch(adminActions.dataSuccess())
        return data;
    } catch (error) {
        dispatch(adminActions.dataFailure())
        console.log(error, "신고목록 불러오기 성공");
    }
}

// 신고 승인/반려 API
export const reportApproval = (data) => async(dispatch)=>{
    console.log(data);
    dispatch(adminActions.dataRequest())
    try {
        const response=await axios.post("/api/business/opinion/report/process",data);
        console.log(response, "신고 승인/반려처리 성공");
        dispatch(adminActions.dataSuccess())
    
    } catch (error) {
        console.log(error, "신고 승인/반려처리 실패");
        dispatch(adminActions.dataFailure())
    }
}

// 모든 회원 목록 API
export const accountList = () => async(dispatch)=>{
    dispatch(adminActions.dataRequest())
    try {
        const response=await axios.get(`/api/user/list/0`);
        const data= response.data;
        console.log("회원 목록 불러오기 성공");
        dispatch(adminActions.dataSuccess())
        return data;
    } catch (error) {
        console.log("회원 목록 불러오기 실패");
        dispatch(adminActions.dataFailure())
    }
}

export const accountDelete = (data) => async(dispatch)=>{
    try {
        console.log(data);
        const response=await axios.post("/api/user/admin/delete", data);
        console.log(response);
        console.log("회원 삭제 성공");
    } catch (error) {
        console.log("회원 삭제 실패");
    }
}



export const adminActions = adminSlice.actions;
export default adminSlice.reducer;