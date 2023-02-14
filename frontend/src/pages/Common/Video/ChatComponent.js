import React, { useEffect, useRef, useState } from "react"
import './ChatComponent.css'
import IconButton from "@material-ui/core/IconButton"
import Fab from "@material-ui/core/Fab"
import HighlightOff from "@material-ui/icons/HighlightOff"
import Send from "@material-ui/icons/Send"
import Tooltip from "@material-ui/core/Tooltip"

const ChatComponent = (props) => {
    const [messageList, setMessageList] = useState([])
    const [message, setMessage] = useState('')
    const chatScroll = useRef()

    useEffect(()=>{
        async function getMessage(e) {
            let data = JSON.parse(e.data);
            setMessageList((prev) => [...prev, {
                connectionId: e.from.connectionId,
                nickname: data.nickname,
                message: data.message
            }])
            // let document = window.document
            // let userImg = document.getElementById('userImg-' + (messageList.length+1))
            // let video = document.getElementById('video-' + data.streamId);
            // let avatar = userImg.getContext('2d');
            // avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
            props.messageReceived();
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
        <div id="chatComponent" style={{display:props.chatDisplay}}>
            <div id="chatToolbar">
                <IconButton id="closeButton" onClick={close}>
                    <HighlightOff color="secondary">
                    </HighlightOff>
                </IconButton>
            </div>

            <div className="message-wrap" ref={chatScroll}>
                {messageList.map((data, index) => {
                    return (<div key={index} id="remoteUsers" className={`message${data.connectionId !== props.user.getConnectionId() ? ' left' : ' right'}`}>
                        <div className="msg-detail">
                            <div className="msg-info">
                                <p>
                                    {data.nickname}
                                </p>
                            </div>
                            <div className="msg-content">
                                    <p className="text">{data.message}</p>
                            </div>
                        </div>
                    </div>)
                })}
            </div>
            <div id="messageInput">
                    <input 
                        placeholder= "Send a messge"
                        id= "chatInput"
                        value= {message}
                        onChange= {handleChange}
                        onKeyPress= {handlePressKey}>
                    </input>
                    <Tooltip title="Send message">
                    <Fab id="sendButton" onClick={sendMessage}><Send></Send></Fab>
                    </Tooltip>
            </div>
        </div>
    </div>
    )
    
    
}

export default ChatComponent