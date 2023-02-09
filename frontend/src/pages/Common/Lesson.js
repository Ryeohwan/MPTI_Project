import React, { Component } from 'react';
import './Lesson.css';
import axios from 'axios';
import OpenViduSession from 'openvidu-react';
import { useState, useEffect } from 'react';

const Test = ()=>{
  const SERVER_URL = 'https://i8a803.p.ssafy.io';
  const SERVER_SECRET = 'mpti';
  const [sessionId,setSessionId] = useState('SessionA')
  const [userName, setUserName] = useState('name'+ Math.floor(Math.random() * 100))
  const [token, setToken] = useState(undefined);
  const [session, setSession] = useState(undefined)
  // FUNCTIONS
  const handlerJoinSessionEvent=()=> {
      console.log('Join session');
  }
  const handlerLeaveSessionEvent= () =>{
      console.log('Leave session');
      setSessionId(undefined)
  }
  const handlerErrorEvent=() => {
      console.log('Leave session');
  }
  const handleChangeSessionId= (e)=>{
      setSessionId(e.target.value)
  }
  const handleChangeUserName= (e) => {
      setUserName(e.target.value)
  }
  const joinSession= (event) => {
      if (sessionId && userName) {
          getToken().then((token) => {
              setToken(token)
              setSession(true)
              console.log(token,'aaa')
          });
          event.preventDefault();
      }
  }


  return(
      <div>
           {session === undefined ? (
                  <div id="join">
                      <div id="join-dialog">
                          <h1> 운동하러 가기 </h1>
                          <form onSubmit={joinSession}>
                              <p>
                                  <label>참가자 이름: </label>
                                  <input
                                      type="text"
                                      id="userName"
                                      value={userName}
                                      onChange={handleChangeUserName}
                                      required
                                  />
                              </p>
                              <p>
                                  <label> 방 이름(세션이름): </label>
                                  <input
                                      type="text"
                                      id="sessionId"
                                      value={sessionId}
                                      onChange={handleChangeSessionId}
                                      required
                                  />
                              </p>
                              <p>
                                  <input name="commit" type="submit" value="JOIN" />
                              </p>
                          </form>
                      </div>
                  </div>
              ) : (
                  <div id="session">
                      <OpenViduSession
                          id="opv-session"
                          sessionName={sessionId}
                          user={userName}
                          token={token}
                          joinSession={handlerJoinSessionEvent}
                          leaveSession={handlerLeaveSessionEvent}
                          error={handlerErrorEvent}
                      />
                  </div>
              )}
      </div>
  )



  async function getToken() {
      return await createSession(sessionId)
          .then((sessionId)=> {console.log(sessionId); return createToken(sessionId)})
          .catch((Err)=>console.error(Err))
  }
  async function createSession(sessionId) {
      const data = JSON.stringify({customSessionId: sessionId});
      return axios.post(SERVER_URL+'/openvidu/api/sessions', data, {
          headers: {
              Authorization:'Basic ' + btoa('OPENVIDUAPP:' + SERVER_SECRET),
              'Content-Type': 'application/json',
          },
      })
      .then((response) => {
          console.log('세션을 만들었습니다 - ',response);
          return (response.data.id); //resolve
      })
      .catch((response => {
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
          console.log('TOKEN :', response.data);
          return (response.data.token); //resolve
      })
      .catch((error)=> console.log(error));
  }









}

export default Test;
