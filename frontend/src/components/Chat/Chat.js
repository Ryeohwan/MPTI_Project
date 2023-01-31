import { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.css'
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';


export default function Chat({chaton, turnoffchat}){
    const [roomnum, setRoomNum] = useState(undefined);
    // 채팅방 목록
    const [roomlist, setRoomList] = useState([]);
    // 채팅 내역
    const [chatlist, setchatlist] = useState([]);
    const [userid, setUserId] = useState(1);
    // const [target,setTarget] = useState(1);
    const [role, setRole] = useState('USER');
    const [name, setName] = useState('내이름');
    const serverurl = 'http://i8a803.p.ssafy.io:8005'
    const socket = useRef(); // 소켓 서버
    const stompClient = useRef(); // stompe 서버

    useEffect(() => {
        if(chaton === false){
            document.getElementById('chat').style.display='none'
            if(stompClient.current){
                disconnect_socket_server();
            }
        }
        else{

            socket.current = new SockJS(serverurl)
            stompClient.current= Stomp.over(socket.current)
            // 채팅창 오픈
            document.getElementById('chat').style.display='flex'
            // 소켓 서버 연결
            connect_socket_server();
        }
    },[chaton])

    
    // 소켓 서버 연결
    function connect_socket_server() {
        stompClient.current.connect({}, (frame) => {
                console.log('소켓 서버에 연결했습니다', frame)
                if(roomnum !== undefined){
                    enter_chat_room(roomnum)
                }
                // 채팅방 목록 가져오기
                getRoomList()
            },
            (error) => {
                console.log(error)
            }
        )
    }
    // 소켓 서버 해체
    function disconnect_socket_server() {
        stompClient.current.disconnect(() => {console.log("소켓 서버와 연결을 끊었습니다.")})
    }

    // 채팅 룸 접속
    async function enter_chat_room(room_id) {
        await leave_chat_room(room_id)
        setRoomNum(room_id)

        getChatList(room_id)
        // 소켓에 send했을때, 구독한 이곳에서 응답받고 이 함수를 실행. message는 응답 받은 메시지
        stompClient.current.subscribe(`/send/${room_id}`, (message) => {
            const msg= JSON.parse(message.body)
            console.log('받은 메시지 :',msg)
            setchatlist((prev) =>([...prev, msg]))
        }, {id : room_id})
    }
    // 채팅 룸 떠나기

    async function leave_chat_room(room_id) {
        setchatlist([])
        await stompClient.current.unsubscribe(room_id)
        setRoomNum(undefined)
    }

    // 메시지 보내기
    function handleSubmit(event) {
        event.preventDefault(); 
        if (stompClient.current && stompClient.current.connected){
            const msg = {
                'channelId': roomnum,
                'userName': name,
                'content': event.target['0'].value
            }
            stompClient.current.send("/chat/receive", {}, JSON.stringify(msg))
        }
    }

    // 상대방과 채팅 채널 만들기.
    function searchChannel(target) {
        if(role==='USER'){
            return axios.get(serverurl+`/chat/channel/${target}/${userid}`).then((res) => {
                return res.data
            })
        }
        if(role==='TRAINER'){
            return axios.get(serverurl+`/chat/channel/${userid}/${target}`).then((res) => {
                return res.data
            })
        }
    }

    // 채팅방 목록 가져오기 (채팅 룸 id필요)
    function getRoomList() {
        axios.get(serverurl+`/chat/load/list/${userid}/${role}`).then((res) => {
            setRoomList(res.data)
        })
    }

    // 채팅방 목록 보여주기
    function showRoomList() {
        return(
            roomlist.map((room, index) => {
                return <div className={styles.room_box} key={index} onClick={(event) => {enter_chat_room(room.channelId); console.log(`${room.channelId}방 이동`)}}>{room.yourId}님 과의 대화, 내용:{room.content}</div>
            })
        )
    }
    // 채팅 내역 가져오기
    async function getChatList(room_id) {
        axios.get(serverurl+'/chat/load/'+ room_id).then((res) => {
            setchatlist(res.data)
        })
    }
    // async function getChatList(target) {
    //     const room_id = await searchChannel(target)
    //     axios.get(serverurl+'/chat/load/'+ room_id).then((res) => {
    //         enter_chat_room(room_id)
    //         setchatlist(res.data)
    //     })
    // }
    // 상대방과 채팅 내역 보여주기
    function showChatList() {
        return(
            chatlist.map((chat, index) => {
                return <div key={index}>{chat.content}</div>
            })
        )
    }


    return(
        <div id='chat' className={styles.modal}>
            <div className={styles.modal_box}>
                <div className={styles.title_search}>  
                    <div className={styles.chat_title_box}>
                        {roomnum? [<div className={styles.chat_exit_btn} onClick={() => {leave_chat_room()}}>&lt;&nbsp;</div>,<div>{roomnum}번 방</div>]:[<div>&nbsp;&nbsp;</div>,<div>채팅방</div>]}
                        <div className={styles.chat_exit_btn} onClick={()=>{turnoffchat()}}>❌</div>
                    </div>
                    <input className={styles.chat_search_bar} placeholder='사용자 검색'></input>
                </div>


                <div className={styles.chat_temp}>
                    {
                    roomnum?
                        <div id={styles.message_box}>{showChatList()}</div>
                        :
                        <div id={styles.room_list}>{showRoomList()}</div>
                    }
                    <div>
                        <form className={styles.message_form} method='submit' onSubmit={(event)=>{handleSubmit(event)}}>
                            <input id='message_input' className={styles.chat_input}></input>
                            <button>Send</button>
                        </form>
                        {/* <div>사용자 번호</div>
                        <input onChange={(e)=>setUserId(e.target.value)} defaultValue={userid}></input>
                        <div> 상대방 번호</div>
                        <input onChange={(e)=>setTarget(e.target.value)} defaultValue={target}></input>
                        <div>Role</div>
                        <input onChange={(e)=>setRole(e.target.value)} defaultValue={role}></input>
                        <div>이름</div>
                        <input onChange={(e)=>setName(e.target.value)} defaultValue={name}></input>
                        <button onClick={() => getChatList(target)} >채팅방 접속</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}