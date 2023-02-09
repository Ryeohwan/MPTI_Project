import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// 트레이너 더미 데이터
// const initialState = {
//     id:12,
//     name: "이예은",
//     email: "dodamond@naver.com",
//     phone: "01012345678",
//     image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFQjXi0ek-BPMjHrRVkmrEfilPmd45P8aXrt1Ga4T6n3NLxlCwA_G1SG4r1WNHxov0pY&usqp=CAU",
//     isLoading: false,
//     error: null,
//     role:"trainer",
//     isCheckMsg: ""
// };

// 회원 더미 데이터
const initialState = {
    id:1,
    name: "Axe",
    email: "aschettini0@biglobe.ne.jp",
    phone: "107-463-1245",
    s3url: "https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/220px-Eulyongta+(1).jpg",
    isLoading: false,
    error: null,
    role:"ROLE_USER",
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


    




export const etcActions = etcSlice.actions;
export default etcSlice.reducer;