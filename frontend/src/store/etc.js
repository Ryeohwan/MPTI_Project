import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "",
    email: "",
    phone: "",
    image: "",
    isLoading: false,
    isLoggedIn: false,
    error: null,
    isCheckMsg: ""
};

const etcSlice = createSlice({
    name: 'etc',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
        },
        loginSuccess: (state) => {
            state.isLoading = false;
            state.isLoggedIn = true;
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
        },
        duplicateMsg: (state,action)=>{
            state.isCheckMsg= action.payload;
        }
        
    },
});

export const trainerListByPage = (pagenum) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/trainer/list/${pagenum}`);
        console.log(response.data);
    } catch (error) {

    }
}

export const trainerListByStar = (pagenum) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/trainer/listbystar/${pagenum}`);
        console.log(response.data.content);
        console.log("별점순 트레이너 리스트 정보확인")
        return response.data.content;
    } catch (error) {

    }
}

export const trainerDetail = (email) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/trainer/info/${email}`);
        console.log(response);
    } catch (error) {

    }
}
    




export const etcActions = etcSlice.actions;
export default etcSlice.reducer;