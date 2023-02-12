import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
// 트레이너 더미 데이터
// const initialState = {
//     id:12,
//     name: "이예은",
//     email: "dodamond@naver.com",
//     phone: "01012345678",
//     s3Url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFQjXi0ek-BPMjHrRVkmrEfilPmd45P8aXrt1Ga4T6n3NLxlCwA_G1SG4r1WNHxov0pY&usqp=CAU",
//     isLoading: false,
//     error: null,W
//     role:"[ROLE_TRAINER]",
//     isCheckMsg: ""
// };

// 트레이너 더미 데이터
const initialState = {
    id:1,
    name:'Axe',
    email:'aschettini0@biglobe.ne.jp',
    phone: "107-463-1222",
    s3Url:'https://s3.ap-northeast-2.amazonaws.com/i8a803.p.ssafy.io.baguni/aschettini0',
    isLoading: false,
    error: null,
    role:"[ROLE_USER]",
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


// 트레이너 리스트 by page
export const trainerListByPage = (pagenum) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/trainer/list/${pagenum}`);
        console.log(response.data);
    } catch (error) {

    }
}

// 트레이너 리스트 by star
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

// 트레이너 상세정보
export const trainerDetail = (email) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/trainer/info/${email}`);
        console.log(response);
        console.log(111)
        return response.data
    } catch (error) {

    }
}

export const reviewList = (pagenum) => async(dispatch) =>{
    try {
        const response = await axios.get(`/api/business/opinion/review/list/${pagenum}`);
        console.log("여가야ㅑㅑㅑㅑ");
        console.log(response);
        console.log("리뷰 리스트 소환");
        return response.data.content;
    } catch (error) {
        console.log("리뷰 리스트 실패");
    }
}

// 고객 운동기록
export const workoutList = (email) => async(dispatch) =>{

    try {
        const response = await axios.get(`/api/user/status/${email}`)
        console.log(response.data);
        console.log("운동 데이터 불러오기 성공");
        return response.data;
    } catch (error) {
        console.log("운동 데이터 불러오기 실패");
    }
}

// 트레이너 리뷰
export const trainerReview = (id, page) => async(dispatch) => {
    try{
        const response = await axios.get(`/api/business/opinion/review/trainer/list/${id}/${page}`)
        return response.data;
    } catch (error) {
        console.log("트레이너 본인의 리뷰 axios 에러")
    }
}

// 고객 상세정보
export const clientDetail = (email) => async(dispatch) => {
    try{
        const response = await axios.post('/api/user/info',{email:email})
        return response.data;
    } catch {
        console.log("고객 본인정보 불러오기 axios 에러")
    }
}

// 고객 나의리뷰
export const clientReview = (id, page) => async(dispatch) => {
    try{
        const response = await axios.get(`/api/business/opinion/review/user/list/${id}/${page}`)
        
        return response.data;
    } catch(error) {
        console.log("고객 본인리뷰 불러오기 axios 에러")
        return error;
    }
}
// 고객 정보 수정
export const clientEditInfo = (email, password, phone) => async(dispatch) => {
    try{
        const response = await axios.post('/api/user/update', {email:email, password:password, phone:phone})
        return response.data;
    } catch(error) {
        alert('비밀번호가 틀립니다.')
        console.log("고객 마이페이지 수정 axios 에러")
        return false;
    }
}
// 고객의 내 스케줄
export const clientSchedule = (id) => async (dispatch) => {
    try{
        const response = await axios.get(`/api/business/reservation/user/list/${id}`)
        return response.data
    } catch(error) {
        alert('정상적인 경로가 아닙니다.')
    }
}
// 상대방과 대화방 만들기
export const getChatRoom = (myId, myRole, targetId) => async (dispatch) => {
    try{
        const requestUrl = '/api/chat/channel/'+ (myRole && myRole==='[ROLE_USER]'?`${targetId}/${myId}`:`${myId}/${targetId}`)
        console.log(requestUrl,'여기')
        const response = await axios.get(requestUrl)
        console.log(response,'여기2')
        return response.data
    } catch (error) {
        alert('etc getChatRoom 채팅룸 받기 에러!')
    }
}
// 나의 모든 대화방 가져오기
export const getChatRoomList = (id, role) => async (dispatch) => {
    try{
        let temp
        if(role==='[ROLE_USER]'){
            temp = 'user'
        } else if (role ==='[ROLE_TRAINER]'){
            temp = 'trainer'
        }
        const response = await axios.get(`/api/chat/load/list/${id}/${temp}`)
        return response.data
    } catch (error) {
        alert('etc getChatRoomList 채팅룸 목록 받기 에러!')
    }
}
// 채팅방 대화 기록 가져오기
export const getChatList = (channelId) => async (dispatch) => {
    try{
        const response = await axios.get(`/api/chat/load/${channelId}`)
        return response.data
    } catch(error) {
        alert('etc getChatList 채팅방 대화 기록 가져오기 에러!')
    }
}
// 회원 운동기록 추가
export const sendLog = (data) => async (dispatch) =>{
    (await axios.post('/api/user/count',data).then((res) => {alert('보내기 성공')}).catch((res)=>{alert('Error')}))
}

export const etcActions = etcSlice.actions;
export default etcSlice.reducer;