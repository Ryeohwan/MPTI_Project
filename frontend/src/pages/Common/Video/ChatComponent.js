import React, { useEffect, useRef, useState } from "react"
import './ChatComponent.css'
const ChatComponent = (props) => {
    const [messageList, setMessageList] = useState([])
    const [message, setMessage] = useState('')
    const chatScroll = useRef()
    useEffect(()=>{
        async function getMessage(e) {
            let data = JSON.parse(e.data);
            let temp_messageList = messageList;
            temp_messageList.push({
                connectionId: e.from.connectionId,
                nickname: data.nickname,
                message: data.message
            })
            let document = window.document
            let userImg = document.getElementById('userImg-' + (messageList.length - 1))
            let video = document.getElementById('video-' + data.streamId);
            let avatar = userImg.getContext('2d');
            avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
            props.messageReceived();
            setMessageList(temp_messageList)
            scrollToBottom()
        }
        props.user.getStreamManager().stream.session.on('signal:chat', (e) => {
            getMessage(e)
        })
    },[])


    

    const handleChange = (e) => {
        setMessage(e.target.value)
    }
    const handlePressKey= (e) => {
        if(e.key === 'Enter'){
            sendMessage();
        }
    }
    const sendMessage = () => {
        if(props.user && message) {
            let message_temp = message.replace(/ +(?= )/g, '');
            console.log(message_temp)
            if (message_temp !== '' && message_temp !== '') {
              let data = {
                message: message_temp,
                nickname: props.user.getNickname(),
                streamId: props.user.getStreamManager().stream.streamId
              };
              props.user.getStreamManager().stream.session.signal({
                data: JSON.stringify(data),
                type: 'chat'
              });
            }
        }
        
        setMessage('')
    }

    const scrollToBottom = () => {
        setTimeout(() => {
            try {
              chatScroll.current.scrollTop = chatScroll.current.scrollHeight;
            } catch (err) {}
        }, 20);
    }
    const close = () => {
        props.close(undefined);
    }
    
    return (
    <div id="chatContainer">
        <div id="chatComponent">
            <div id="chatToolbar">
                <span id="closeButton" onClick={close}>
                    <div color="secondary">

                    </div>
                </span>

            </div>
            <div className="message-wrap" ref={chatScroll}>
                {messageList.map((data, index) => {
                    return (<div key={index} id="remoteUsers" className={`message${data.connectionId !== props.user.getConnectionId() ? ' left' : ' right'}`}>
                        <canvas id={'userImg-'+index} width="60" height="60" className="user-img"></canvas>
                        <div className="msg-detail">
                            <div className="msg-info">
                                <p>
                                    <span></span>
                                    {data.nickname}
                                </p>
                            </div>
                            <div className="msg-content">
                                <span className="triangle">
                                    <p className="text">{data.message}</p>
                                </span>
                            </div>
                        </div>
                    </div>)
                })}
                <input 
                    placeholder= "Send a messge"
                    id= "chatInput"
                    value= {message}
                    onChange= {handleChange}
                    onKeyPress= {handlePressKey}>
                </input>
                <div title="Send message">
                    <button id="sendButton" onClick={sendMessage}>보내기</button>
                </div>
            </div>
        </div>
    </div>
    )
    
    
}

export default ChatComponent