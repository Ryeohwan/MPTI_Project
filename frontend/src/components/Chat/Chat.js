import { useState, useEffect } from 'react';
import styles from './Chat.module.css'
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const serverurl = 'http://i8a803.p.ssafy.io:8005'
const socket = new SockJS(serverurl);
let stompClient = Stomp.over(socket);
let channelId= '12';

export default function Chat(){
    const [roomlist, setroomlist] = useState([{channelId:1, userName:'Kim'}, {channelId:2, userName:'Jung'}])
    const [chatlist, setchatlist] = useState([]);
    console.log(chatlist)
    useEffect( () => {
        console.log(`연결 시도할 서버 : ${serverurl}`)
        stompClient.connect(
            {},
            (frame) => {

                console.log('연결했습니다', frame)
                stompClient.subscribe("/send/1", (message) => {
                    console.log("구독하고 받은 메시지",message)
                    setchatlist([...chatlist, JSON.parse(message.body)])
                })
            },
            (error) => {
                console.log(error)
                stompClient.connected = false
            }
    )
        
    }, [])

function handleSubmit(event) {
    event.preventDefault();
    // const input = event.target['0'];
    // console.log(event.target['0'].value);
    // const input = document.getElementById('message_input');
    console.log(event.target['0'].value)
    if (stompClient && stompClient.connected){
        const msg = {
            'channelId': '1',
            'userName': window.location.host,
            'content': event.target['0'].value
        }
        stompClient.send("/chat/receive", {}, JSON.stringify(msg))
    }
    // console.log(input.value);
}

    return(
        <div id='chat' className={styles.modal}>
            <div className={styles.modal_box}>
                <div>  
                    <div className={styles.chat_title_box}>
                        <div>&lt;</div>
                        <div>Chats</div>
                        <div className={styles.chat_exit_btn} onClick={()=>{document.getElementById('chat').style.display='none'}}>❌</div>
                    </div>
                    <input className={styles.chat_search_bar} placeholder='사용자 검색'></input>
                </div>


                <div className={styles.chat_temp}>
                    <div id='message_box'>
                        {chatlist.map((chat) => {
                            return <div>{chat.content}</div>
                        })
                        }
                    </div>

                    <div id={styles.room_list}>
                        {roomlist.map((room) => {
                            return (<div className={styles.room_box} onClick={() => {console.log('방 이동')}}>{room.channelId}번 방, {room.userName}님</div>)
                        })}

                    </div>




                    <div>
                        <form id='message_form' method='submit' onSubmit={(event)=>{handleSubmit(event)}}>
                            <input id='message_input' className={styles.chat_input}></input>
                            <button>Send</button>
                        </form>
                    </div>
                </div>




            </div>
        </div>
    )
}