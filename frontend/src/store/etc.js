import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

// 트레이너 더미 데이터
const initialState = {
    id:undefined,
    name:'',
    email:'',
    phone: "",
    s3Url:'',
    isLoading: false,
    error: null,
    role:"",
    isCheckMsg: "",
    chatOn: false,
    chatRoom: undefined,
    chatTarget:"",
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
        chatToggle: (state) => {
            state.chatOn = !state.chatOn
        },
        chatEnter: (state, action) => {
            console.log(action)
            switch(action.payload.type){
                case 'exit':
                    state.chatRoom=undefined
                    break;
                case 'enter':
                    state.chatRoom = action.payload.payload
                    break;
                default:
                    state.chatRoom=undefined
            }
    },
    chatTarget: (state,payload) => {
        state.chatTarget = payload.payload
    }
    },
});


// 트레이너 리스트 by page
export const trainerListByPage = (pagenum) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try {
        const response = await axios.get(`/api/trainer/list/${pagenum}`);
        dispatch(etcActions.dataSuccess())
        console.log(response.data);
    } catch (error) {
        console.log(error)
        dispatch(etcActions.dataFailure())
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
    dispatch(etcActions.dataRequest())
    try {
        const response = await axios.get(`/api/trainer/info/${email}`);
        console.log(response);
        dispatch(etcActions.dataSuccess())
        return response.data
    } catch (error) {
        dispatch(etcActions.dataFailure())
    }
}

export const reviewList = (pagenum) => async(dispatch) =>{

    dispatch(etcActions.dataRequest())
    try {
        const response = await axios.get(`/api/business/opinion/review/list/${pagenum}`);
        console.log(response);
        console.log("리뷰 리스트 소환");
        dispatch(etcActions.dataSuccess())
        return response.data.content;
    } catch (error) {
        dispatch(etcActions.dataFailure())
        console.log("리뷰 리스트 실패");
    }
}

// 고객 운동기록
export const workoutList = (email) => async(dispatch) =>{
    dispatch(etcActions.dataRequest())
    try {
        const response = await axios.get(`/api/user/status/${email}`)
        console.log(response.data);
        console.log("운동 데이터 불러오기 성공");
        dispatch(etcActions.dataSuccess())
        return response.data;
    } catch (error) {
        console.log("운동 데이터 불러오기 실패");
        dispatch(etcActions.dataFailure())
    }
}

// 트레이너 리뷰
export const trainerReview = (id, page) => async(dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        const response = await axios.get(`/api/business/opinion/review/trainer/list/${id}/${page}`)
        dispatch(etcActions.dataSuccess())
        return response.data;
    } catch (error) {
        dispatch(etcActions.dataFailure())
        console.log("트레이너 본인의 리뷰 axios 에러")
    }
}

// 고객 상세정보
export const clientDetail = (email) => async(dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        const response = await axios.post('/api/user/info',{email:email})
        dispatch(etcActions.dataSuccess())
        return response.data;
    } catch {
        dispatch(etcActions.dataFailure())
        console.log("고객 본인정보 불러오기 axios 에러")
    }
}

// 고객 나의리뷰
export const clientReview = (id, page) => async(dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        const response = await axios.get(`/api/business/opinion/review/user/list/${id}/${page}`)
        dispatch(etcActions.dataSuccess())
        return response.data;
    } catch(error) {
        console.log("고객 본인리뷰 불러오기 axios 에러")
        dispatch(etcActions.dataFailure())
        return error;
    }
}
// 고객 정보 수정
export const clientEditInfo = (email, password, phone) => async(dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        const response = await axios.post('/api/user/update', {email:email, password:password, phone:phone})
        dispatch(etcActions.dataSuccess())
        return response.data;
    } catch(error) {
        alert('비밀번호가 틀립니다.')
        console.log("고객 마이페이지 수정 axios 에러");
        dispatch(etcActions.dataFailure())
        return false;
    }
}
// 고객의 내 스케줄
export const clientSchedule = (id) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        const response = await axios.get(`/api/business/reservation/user/list/${id}`)
        console.log(response.data)
        dispatch(etcActions.dataSuccess())
        return response.data
    } catch(error) {
        dispatch(etcActions.dataFailure())
        console.log(error)
    }
}

// export const cancelSchedule = (userId, reservationId) => async (dispatch) => {
//     try {
//         const response = await axios.post("api/business/reservation/cancel", {id:reservationId, userId:userId})
//         return (response.data)
//     } catch (err) {
//         console.log(err)
//     }
// }
// 상대방과 대화방 만들기
export const getChatRoom = (myId, myRole, myName, targetId, targetName) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        const response = await axios.get('/api/chat/channel/'+
        (myRole==='user'?`${targetId}/${myId}/${targetName}/${myName}`
        :`${myId}/${targetId}/${myName}/${targetName}`))
        dispatch(etcActions.dataSuccess())
        return response.data.id
    } catch (error) {
        alert('etc getChatRoom 채팅룸 받기 에러!')
        dispatch(etcActions.dataFailure())
    }
}
// 나의 모든 대화방 가져오기
export const getChatRoomList = (id, role) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        console.log('나의 아이디, 역할',id,role)
        
        const response = await axios.get(`/api/chat/load/list/${id}/${role==='trainer'?'TRAINER':'USER'}`)
        console.log(response)
        dispatch(etcActions.dataSuccess())
        return response.data
    } catch (error) {
        alert('etc getChatRoomList 채팅룸 목록 받기 에러!')
        dispatch(etcActions.dataFailure())
    }
}
// 채팅방 대화 기록 가져오기
export const getChatList = (channelId) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        const response = await axios.get(`/api/chat/load/${channelId}`)
        dispatch(etcActions.dataSuccess())
        return response.data
    } catch(error) {
        alert('etc getChatList 채팅방 대화 기록 가져오기 에러!')
        dispatch(etcActions.dataFailure())
    }
}
// 회원 운동기록 추가
export const sendLog = (data) => async (dispatch) =>{
    (await axios.post('/api/user/count',data).then((res) => {alert('보내기 성공')}).catch((res)=>{alert('Error')}))
}
// 프로필 사진 업로드
export const uploadImage = (role, formData) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try {
        if(role==='user'){
            return axios.post('/api/user/upload', formData).then((res) => {
            dispatch(etcActions.dataSuccess())    
            return res}).catch((err)=> 
            alert('업로드 실패'))
        }
        else if(role==='trainer'){
            return axios.post('/api/trainer/upload', formData).then((res)=>{
                dispatch(etcActions.dataSuccess())
                return res;
            }).catch((err)=>
            alert('업로드 실패'))
        }

    } catch(error) {
        dispatch(etcActions.dataFailure())
        return '에러'
    }
}
// 이름으로 검색
export const nameSearch = (page, word) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        const response = await axios.get(`/api/trainer/search/name/${page}/${word}`)
        console.log(response.data, '이름검색')
        dispatch(etcActions.dataSuccess())
        return response.data
    } catch(err) {
        dispatch(etcActions.dataFailure())
        return err;
    }
}

// 날짜로 검색
export const dateSearch = (page, date) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        const response = await axios.get(`/api/trainer/search/date/${page}/${date}`)
        // const response = await axios.get(`/api/trainer/search/date/0/20230224`)
        console.log(response.data, '날짜 검색')
        dispatch(etcActions.dataSuccess())
        return response.data
    } catch(err) {
        dispatch(etcActions.dataFailure())
    }
}

// 트레이너 오늘 스케줄(수업/수업 아닌것 포함) 가져오기
export const getDaySchedule = (id, day, page) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        dispatch(etcActions.dataSuccess())
        return await axios.get(`/api/business/reservation/page/${id}/${day.getFullYear()}/${day.getMonth()+1}/${day.getDate()}/${page-1}`).then((res)=> res.data)
    } catch(err) {
        dispatch(etcActions.dataFailure())
        return console.log('트레이너 오늘 수업 가져오기 실패')
    }
}

// 트레이너 본인의 고객들 가져오기
export const getMyClient = (id, page) => async (dispatch) => {
        dispatch(etcActions.dataRequest())
    try{
        dispatch(etcActions.dataSuccess())
        return await axios.post(`/api/user/userList/${page-1}`, { id: id }).then(res=>res.data)
    } catch(err) {
        dispatch(etcActions.dataFailure())
        return console.log('수업 가져오기 실패')
    }
}

// 트레이너 본인에게 예약된 회원 조회
export const getTodayLesson = (id) => async (dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        dispatch(etcActions.dataSuccess())
        return await axios.get(`/api/business/reservation/trainer/reserved/list/${id}`).then(res=>{console.log(res.data); return res.data;})
    } catch(err) {
        dispatch(etcActions.dataFailure())
        return console.log('예약된 회원들 못가져옴')
    }
}

// 리뷰 작성
export const writeReview = (userId, trainerId, star, memo, userName, trainerName) => async(dispatch) => {
    dispatch(etcActions.dataRequest())
    try{
        dispatch(etcActions.dataSuccess())
        return await axios.post('/api/business/opinion/review/write',{
            writerId:userId,
            targetId:trainerId,
            star:star,
            memo:memo,
            writerName:userName,
            targetName:trainerName
        }).then((res) => console.log(res.data))
    } catch(err) {
        dispatch(etcActions.dataFailure())
        return console.log('리뷰 작성 실패')
    }
}

// 트레이너 개인정보 바꾸기(휴대폰 번호)
export const changeTrainerInfo = (email, phone) => async (dispatch) => {
    try{
        return await axios.post('/api/trainer/info/update/'+email,{phone}).then((res)=>res.data)
    } catch(err) {
        return alert('트레이너 정보 바꾸기 문제가 생겼습니다.')
    }
}

export const etcActions = etcSlice.actions;
export default etcSlice.reducer;
