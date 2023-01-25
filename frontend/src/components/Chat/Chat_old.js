import { useState } from 'react';
import styles from './Chat.module.css'


const serverurl = 'ws://localhost:5000/'
const socket = new WebSocket(serverurl);

export default function Chat(){
    const [chatlist, setchatlist] = useState([]);
    socket.addEventListener("open", () => {
        console.log("Conneted to Browser✅");
        const hour = parseInt(new Date().getHours()/12)===0?'오전'+new Date().getHours():'오후'+(new Date().getHours()-12);
        const minute = new Date().getMinutes()>9?new Date().getMinutes():'0'+new Date().getMinutes();
        setchatlist([{id:1, content:'sever_connected', time:hour+':'+minute, user:serverurl}])
    });
    socket.addEventListener("message", (message) =>{
        let reader = new FileReader();
        const hour = parseInt(new Date().getHours()/12)===0?'오전'+new Date().getHours():'오후'+(new Date().getHours()-12);
        const minute = new Date().getMinutes()>9?new Date().getMinutes():'0'+new Date().getMinutes();
        reader.readAsText(message.data)
        reader.onload=function() {
            const result= JSON.parse(reader.result)
            setchatlist([...chatlist, {id: chatlist.length+1 , content:result.content, time:hour+':'+minute, user:result.host}])
        }
        // console.log("Just got this: ",message.data, "from the server");
        
        // newMessage.setAttribute('style','color:white; list-style:none')
        // newMessage.innerText = '글쓴이' + message.data;
        // console.log(msgbox);
        // msgbox.appendChild(newMessage);
    });

    socket.addEventListener("close", () =>{
        console.log("Disconnected from the server❌")
    })


function handleSubmit(event) {
    event.preventDefault();
    const input = event.target['0'];
    // console.log(event.target['0'].value);
    // const input = document.getElementById('message_input');
    socket.send(JSON.stringify({host: window.location.origin, content: input.value}));
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
                            if(chat.user === window.location.origin)
                                return(
                                    <li key={chat.id} className={styles.chat_talk_box}>
                                        <div className={styles.chat_profile}>🧑본인 아이디</div>
                                        <div className={styles.chat_talk_content}> {chat.content}</div>
                                        <div className={styles.chat_time_box}><span className={styles.chat_time}>{chat.time}</span></div>
                                    </li>
                            )
                            else
                                return(
                                    <li key={chat.id} className={styles.chat_talk_box}>
                                        <div className={styles.chat_time_box}><span className={styles.chat_time}>{chat.time}</span></div>
                                        <div className={styles.chat_talk_content}> {chat.content}</div>
                                        <div className={styles.chat_profile}>🧑상대방</div>
                                </li>
                                )
                        }
                        )}
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