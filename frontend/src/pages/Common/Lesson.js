import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import VideoRoom from './Video/VideoRoom';
import styles from './Lesson.module.css'
const SERVER_URL = 'https://i8a803.p.ssafy.io';
const SERVER_SECRET = 'mpti';
const Lesson = ()=>{
    const location = useLocation()
    // state.name, sessionId, name(yourname), clientName
    //sessionId, clientId, trainerId, role, image, trainerName
    const userName = location.state.name
    const sessionId = location.state.sessionId
    const [token, setToken] = useState(undefined);
    const [session, setSession] = useState(undefined)
    useEffect(()=>{
    joinSession()
    }, [])
    //FUNCTIONS
    const handlerJoinSessionEvent=()=> {
        console.log('레슨방 입장');
    }
    const handlerLeaveSessionEvent= () =>{
        window.location.replace('/home')
        console.log('레슨방 떠나기');
    }
    const handlerErrorEvent=() => {
        console.log('Leave session');
        
    }
    const joinSession= () => {
        if (sessionId && userName) {
            getToken().then((token) => {
                setToken(token)
                setSession(true)
            });
        }
    }

    return(
        <div className={styles.box}>
            {session === undefined ? (
                    <div>
                    </div>
                ) : (
                    <div id="session">
                        <VideoRoom
                            id="opv-session"
                            sessionName={sessionId}
                            user={userName}
                            token={token}
                            joinSession={handlerJoinSessionEvent}
                            leaveSession={handlerLeaveSessionEvent}
                            error={handlerErrorEvent}
                            clientId={location.state.clientId}
                            trainerId={location.state.trainerId}
                            clientName={location.state.clientName}
                            trainerName={location.state.trainerName}
                        />
                    </div>
                )}
        </div>
    )



    async function getToken() {
        return await createSession(sessionId)
            .then((sessionId)=> {return createToken(sessionId)})
            .catch((Err)=>console.error(Err))
    }
    async function createSession(sessionId) {
        const data = JSON.stringify({customSessionId: sessionId});
        console.log(sessionId,'세션아이디')
        return axios.post(SERVER_URL+'/openvidu/api/sessions', data, {
            headers: {
                Authorization:'Basic ' + btoa('OPENVIDUAPP:' + SERVER_SECRET),
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            return (response.data.id); //resolve
        })
        .catch((response => {
            console.log('OPEN_VIDU API 확인')
            const error = Object.assign({}, response);
            if (error.response && error.response.status === 409){
                
                return (sessionId); //resolve
            } else {
                console.log(error);
                console.warn('연결 못했습니다.');
                if ( window.confirm('certificate문제로 연결 못했습니다. OK 누르세요 ')) {
                    window.location.assign(SERVER_URL + '/accept-certificate');
                }
            }
        }))
    }

    async function createToken(sessionId) {
        const data = JSON.stringify({});
        return  axios
            .post(SERVER_URL+'/openvidu/api/sessions/'+ sessionId + '/connection', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + SERVER_SECRET),
                    'Content-Type': 'application/json',
                },
        })
        .then((response) => {
            return (response.data.token); //resolve
        })
        .catch((error)=> console.log(error));
    }









    }

export default Lesson;
