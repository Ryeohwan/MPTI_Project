import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: "",
    email: "",
    phone: "",
    image: "",
    isLoading: false,
    error: null,
    isCheckMsg: ""
};

const etcSlice = createSlice({
    name: 'etc',
    initialState,
    reducers: {
        dataRequest: (state) => {
            state.isLoading = true;
        },
        dataSuccess: (state) => {
            state.isLoading = false;
       
        },
        dataFailure: (state, action) => {
            state.isLoading = false;
        },
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
    dispatch(etcActions.dataRequest())
    try {
        const response = await axios.get(`/api/trainer/listbystar/${pagenum}`);
        console.log(response.data.content);
        console.log("별점순 트레이너 리스트 정보확인")
        dispatch(etcActions.dataSuccess())
        return response.data.content;
    } catch (error) {
        dispatch(etcActions.dataFailure())
    }
}

export const trainerDetail = (email) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/trainer/info/${email}`);
        console.log(response);
    } catch (error) {

    }
}

export const reviewList = ()

    




export const etcActions = etcSlice.actions;
export default etcSlice.reducer;