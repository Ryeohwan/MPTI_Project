import { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.css'
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';



// let channelId= '12';

export default function Chat({chaton, turnoffchat}){
    const [roomnum, setRoomNum] = useState(undefined);
    const [roomlist, setRoomList] = useState([]);
    const [chatlist, setchatlist] = useState([]);
    const [userid, setUserId] = useState(1);
    const [role, setRole] = useState('USER')
    const serverurl = 'http://i8a803.p.ssafy.io:8005'
    const socket = useRef(); // 소켓 서버
    const stompClient = useRef(); // stompe 서버

    useEffect(() => {
        if(chaton === false){
            document.getElementById('chat').style.display='none'
            if(stompClient.current){
                console.log('채팅앱 종료')
                disconnect_socket_server();
            }
        }
        else{
            console.log('채팅앱 시작')
            socket.current = new SockJS(serverurl)
            stompClient.current= Stomp.over(socket.current)
            document.getElementById('chat').style.display='flex'
            // 소켓 서버 연결
            connect_socket_server();
        }
    },[chaton])

    
    // 소켓 서버 연결
    function connect_socket_server() {
        stompClient.current.connect({id:1, jwt:'123'}, (frame) => {
                console.log('소켓 서버에 연결했습니다', frame)
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
    async function enter_chat_room(room_info) {
        leave_chat_room()
        const room_id =  room_info.channelId
        setRoomNum(room_id)
        stompClient.current.subscribe(`/send/${room_id}`, (message) => {
            // 소켓에 send했을때, 구독한 이곳에서 응답받고 이 함수를 실행. message는 응답 받은 메시지
            const msg= JSON.parse(message.body)
            console.log('받은 메시지 :',msg)
            setchatlist((prev) =>([...prev, msg]))
        },{id : room_id})
    }
    // 채팅 룸 떠나기
    function leave_chat_room() {
        stompClient.current.unsubscribe(roomnum)
        setRoomNum(undefined)
    }
    // 메시지 보내기
    function handleSubmit(event) {
        event.preventDefault();
        if (stompClient.current && stompClient.current.connected){
            const msg = {
                'channelId': 1,
                'userName': '내이름',
                'content': event.target['0'].value
            }
            stompClient.current.send("/chat/receive", {}, JSON.stringify(msg))
        }
    }

    // 상대방과 채팅 채널 있는지 조회
    function searchChannel(target) {
        if(role==='USER'){
            axios.get(serverurl+`/chat/channel/${target}/${userid}`).then((res) => {
                console.log(res)
            })
        }
        if(role==='TRAINER'){
            axios.get(serverurl+`/chat/channel/${userid}/${target}`).then((res) => {
                console.log(res)
            })
        }
    }

    // 채팅 내역 가져오기
    function getChatList() {
        console.log(roomnum)
        axios.get(serverurl+``).then((res) => {
            console.log(res.data)
        })
    }

    // 채팅방 목록 가져오기 (채팅 룸 id필요)
    function getRoomList() {
        console.log(1, role, userid)
        // role(trainer or user)의 데이터에서 id= useid인 채팅방 id 다 가져오기.
        axios.get(serverurl+'/chat/load/list/1/USER').then((res) => console.log(res))
        // axios.get(serverurl+`/chat/load/list/${userid}/${role}`).then((res) => {
        //     // res.data 콘솔찍기
        //     console.log(res)
        //     setRoomList(res.data)
        // })
    }

    // 채팅방 목록 보여주기
    function showRoomList() {
        return(
            roomlist.map((room, index) => {
                // console.log(room)
                return <div className={styles.room_box} key={index} onClick={(event) => {enter_chat_room(room.writer); console.log(`${room.writer}방 이동`)}}>{room.writer}번 방, {room.content}님</div>
            })
        )
    }

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
                    </div>
                </div>
            </div>
        </div>
    )
}