import React, { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.css'
import { useSelector, useDispatch } from 'react-redux';

import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import RoomList from './RoomList';
import ChatList from './ChatList';
import { etcActions, getChatRoomList } from '../../store/etc';

const chatServerUrl = 'http://i8a803.p.ssafy.io:8005';
const Chat = () => {
    const dispatch = useDispatch()
    const {id, email, role, name, image } = useSelector((state) => state.auth)
    const {chatOn, chatRoom, chatTarget} = useSelector(state=>state.etc)
    const [roomlist, setRoomList] = useState([])
    

    // console.log(chatOn, 'Chat에서')
    // 채팅방 목록
    

    // 채팅 내역
    const [chatlist, setchatlist] = useState([]);
    // 소켓 서버, stomp 서버
    const socket = useRef(); 
    const stompClient = useRef();
    const searchValue = useRef();
    const scroll = useRef();
    if(searchValue.current){
        console.log(searchValue.current.value)
    }
    useEffect(()=>{
        return () => {
            console.log('chat 언마운트')
            disconnect_socket_server();
        }
    }, [])

    // chat (on/off)마다 실행
    useEffect(()=>{
        if(chatOn === false){
            if(stompClient.current) {
                disconnect_socket_server();
            }
        } else {
            socket.current = new SockJS(chatServerUrl)
            stompClient.current= Stomp.over(socket.current)
            connect_socket_server();
        }
    },[chatOn])


    useEffect(() => {
        scroll.current.scrollTop = scroll.current.scrollHeight
        
        if(chatRoom===undefined){
            getRoomList()
        }
    }, [chatlist])
    
    // 소켓 서버 연결
    function connect_socket_server() {
        stompClient.current.connect({}, (frame) => {
                console.log('소켓 서버에 연결했습니다', frame)
                // 이전에 들어간 채팅방 있으면 기억해서 들어가기
                if(chatRoom !== undefined){
                    enter_chat_room(chatRoom,chatTarget)
                }
                else
                {
                    // 채팅방 목록 가져오기
                    getRoomList()
                }
            },
            (error) => {
                console.log(error)
            }
        )
    }
    // 소켓 서버 해체
    function disconnect_socket_server() {
        if(stompClient.current){
            stompClient.current.disconnect(() => {console.log("소켓 서버와 연결을 끊었습니다.")})
        }
    }

    // 채팅 룸 접속
    async function enter_chat_room(room_id, chatTarget) {
        await leave_chat_room(room_id)
        dispatch(etcActions.chatTarget(chatTarget))
        dispatch(etcActions.chatEnter({'payload':room_id,'type':'enter'}))
        
        getChatList(room_id)
        // 소켓에 send했을때, 구독한 이곳에서 응답받고 이 함수를 실행. message는 응답 받은 메시지
        stompClient.current.subscribe(`/send/${room_id}`, (message) => {
            const msg= JSON.parse(message.body);
            console.log(msg);
            [msg.year, msg.month, msg.day] = msg.createdDate.split('T')[0].split('-');
            [msg.hour, msg.minute] = msg.createdDate.split('T')[1].split(':');
            msg.newmessage = true;
            msg.me=name===msg.writer?true:false;
            setchatlist((prev) =>([...prev, msg]))
        }, {id : room_id})
    }

    // 채팅 룸 떠나기
    async function leave_chat_room(room_id) {
        dispatch(etcActions.chatTarget(''))
        getRoomList()
        setchatlist([])
        await stompClient.current.unsubscribe(room_id)
        dispatch(etcActions.chatEnter({'payload':undefined,'type':'exit'}))
    }

    // 메시지 보내기
    function handleSubmit(event) {
        event.preventDefault(); 
        if (stompClient.current && stompClient.current.connected){
            const msg = {
                'channelId': chatRoom,
                'writer': name,
                'content': event.target['0'].value
            }
            stompClient.current.send("/api/chat/receive", {}, JSON.stringify(msg))
        }
    }

    // 채팅방 목록 가져오기 (채팅 룸 id필요)
    function getRoomList() {
        console.log('방목록 가져온다')
        dispatch(getChatRoomList(id, role)).then((data) => {setRoomList(data);console.log('채팅방 목록',data)})
    }

    // 채팅방 목록 보여주기
    function showRoomList() {
        //채팅방 목록 출력
        return(
            roomlist.map((room, index) => {
                return <div key={`room${room.channelId}`}>
                        <RoomList content={room.content} user={room.yourName} userId={room.yourId} channelId={room.channelId} date={room.createdDate}  enter_chat_room={enter_chat_room} />
                        </div>
            })
        )
    }
    // 채팅 내역 가져오기
    async function getChatList(room_id) {
        axios.get('/api/chat/load/'+ room_id).then((res) => {
            res.data.map((Adata) => {
                if(Adata.writer===name)Adata.me=true; else Adata.me=false;
                const [date, time]=Adata.createdDate.split('T');
                [Adata.year, Adata.month, Adata.day] = date.split('-');
                [Adata.hour, Adata.minute] = time.split(':');
                Adata.hour = (parseInt(Adata.hour))%24
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
                        return  <div key={index}>
                                    <ChatList {...chat} />
                                </div>
                    }
                    // 처음 채팅, 날짜가 달라지는 채팅은 날짜를 추가해준다.
                    if(chat.newmessage){
                        return  <div key={index}>
                                    <ChatList {...chat} />
                                </div>
                    }
                    return  <div key={index}>
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

    return(
        <div id='chat' className={styles.modal}>
            <div className={styles.modal_box}>
                <div className={styles.title_search}>  
                    <div className={styles.chat_title_box}>
                        {chatRoom? [<div key='back' className={styles.chat_exit_btn} onClick={() => {leave_chat_room()}}>&lt;&nbsp;</div>,<div key='room_name'>{chatTarget} 님</div>]:[<div key='whitespace'>&nbsp;&nbsp;</div>,<div key='roomlist'>채팅방</div>]}
                        <div className={styles.chat_exit_btn} onClick={()=>{dispatch(etcActions.chatToggle())}}>❌</div>
                    </div>
                    {!chatRoom && <input ref={searchValue} className={styles.chat_search_bar} placeholder='사용자 검색'></input>}
                </div>


                <div ref={scroll} id='chat_scroll' className={styles.chat_temp}>
                    {chatRoom?
                        <div id={styles.message_box}>{showChatList()}</div>
                        :
                        <div id={styles.room_list}>{showRoomList()}</div>
                    }
                </div>
                    {chatRoom?<form className={styles.message_form} method='submit' onSubmit={(event)=>{handleSubmit(event); event.target['0'].value=null; }}>
                        <input id='message_input' className={styles.chat_input}></input>
                        <button className={styles.input_button}>></button>
                    </form>:null}
                        
                
            </div>
        </div>
    )
}



export default Chat