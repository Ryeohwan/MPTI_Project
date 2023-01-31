import { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.css'
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import RoomList from './RoomList';
import ChatList from './ChatList';

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
            document.getElementById('chat').style.display='flex'
            connect_socket_server();
        }
    },[chaton])

    useEffect(() => {
        const scroll = document.getElementById('chat_scroll')
        scroll.scrollTop = scroll.scrollHeight
    }, [roomnum])
    
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
            console.log(stompClient.current)
            console.log('받은 메시지 :',msg);
            msg.year = new Date().getFullYear();
            msg.month = new Date().getMonth()+1;
            msg.day = new Date().getDate();
            msg.hour = new Date().getHours();
            msg.minute = new Date().getMinutes();
            msg.newmessage = true;
            msg.me=name===msg.userName?true:false;
            console.log(msg)
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
        //채팅방 목록 출력
        
        return(
            roomlist.map((room, index) => {
                return <div key={`room${room.channelId}`}>
                        <RoomList content={room.content} user={room.yourId} channelId={room.channelId} enter_chat_room={enter_chat_room} />
                        </div>
            })
        )
    }
    // 채팅 내역 가져오기
    async function getChatList(room_id) {
        axios.get(serverurl+'/chat/load/'+ room_id).then((res) => {
            res.data.map((Adata) => {
                if(Adata.writer===name)Adata.me=true; else Adata.me=false;
                const [date, time]=Adata.createdDate.split('T');
                [Adata.year, Adata.month, Adata.day] = date.split('-');
                [Adata.hour, Adata.minute] = time.split(':');
                Adata.hour = (parseInt(Adata.hour)+7)%24
            })
            setchatlist(res.data)
        })
    }

    // 상대방과 채팅 내역 보여주기
    function showChatList() {
        if(chatlist){
            return(
                
                chatlist.map((chat, index) => {
                    if(index && chat.day===chatlist[index-1].day && chat.month === chatlist[index-1].month && chat.year === chatlist[index-1].year){ 
                        return  <div key={`chat${chat.id}`}>
                                    <ChatList {...chat} />
                                </div>
                    }
                    // 처음 채팅, 날짜가 달라지는 채팅은 날짜를 추가해준다.
                    if(chat.newmessage){
                        return  <div key={`chat${chat.id}`}>
                                    <ChatList {...chat} />
                                </div>
                    }
                    return  <div key={`chat${chat.id}`}>
                                <div className={styles.chat_list_day}>{chat.year}년 {chat.month}월 {chat.day}일</div>
                                <ChatList {...chat} />
                            </div>
                })
                
            )
        }
        else{
            return <div>채팅방이 없습니다.</div>
        }
            
    }

    // async function getChatList(target) {
    //     const room_id = await searchChannel(target)
    //     axios.get(serverurl+'/chat/load/'+ room_id).then((res) => {
    //         enter_chat_room(room_id)
    //         setchatlist(res.data)
    //     })
    // }


    return(
        <div id='chat' className={styles.modal}>
            <div className={styles.modal_box}>
                <div className={styles.title_search}>  
                    <div className={styles.chat_title_box}>
                        {roomnum? [<div key='back' className={styles.chat_exit_btn} onClick={() => {leave_chat_room()}}>&lt;&nbsp;</div>,<div key='room_name'>{roomnum}번 방</div>]:[<div key='whitespace'>&nbsp;&nbsp;</div>,<div key='roomlist'>채팅방</div>]}
                        <div className={styles.chat_exit_btn} onClick={()=>{turnoffchat()}}>❌</div>
                    </div>
                    <input className={styles.chat_search_bar} placeholder='사용자 검색'></input>
                </div>


                <div id='chat_scroll' className={styles.chat_temp}>
                    {
                    roomnum?
                        <div id={styles.message_box}>{showChatList()}</div>
                        :
                        <div id={styles.room_list}>{showRoomList()}</div>
                    }
                </div>
                
                        {roomnum?<form className={styles.message_form} method='submit' onSubmit={(event)=>{handleSubmit(event); event.target['0'].value=null; }}>
                            <input id='message_input' className={styles.chat_input}></input>
                            <button className={styles.input_button}>send</button>
                        </form>:null}
                        
                
            </div>
        </div>
    )
}