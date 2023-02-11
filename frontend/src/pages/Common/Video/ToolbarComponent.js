import React, {useState, useEffect} from "react"
import './ToolbarComponent.css'

const ToolbarComponent = (props) => {

    const [fullScreen, setFullScreen] = useState(false)

    const micStatusChanged=()=> {
        props.micStatusChanged()
    }
    const camStatusChanged=()=>{
        props.camStatusChanged()
    }
    const screenShare=() => {
        props.screenShare()
    }

    const stopScreenShare=()=> {
        props.stopScreenShare()
    }
    const toggleFullscreen=()=> {
        props.toggleFullscreen()
    }
    const switchCamera=()=> {
        props.switchCamera()
    }
    const leaveSession=()=>{
        props.leaveSession()
    }
    const toggleChat=()=>{
        props.toggleChat()
    }





    return <div className='toolbar' id='header'>
        <div className='toolbar'>
            <div id='navSessionInfo'>
                <img id='header_img' alt='logo' src='/MPTIlogo.png'>
                </img>
                {props.sessionId
                && <div id='titleContent'>
                    <span id='session-title'>
                        방이름 : {props.sessionId}
                    </span>
                    </div>}
            </div>
            <div className='buttonsContent'>
                <div color='inherit' className='navButton' id='navMicButton' onClick={micStatusChanged}>
                    {props.user !== undefined && props.user.isAudioActive() ? <div>마익</div>:<div color='secondary'>마익오프</div>}

                </div>
                <div color='inherit' className='navButton' id='navCamButton' onClick={camStatusChanged}>
                    {props.user !== undefined && props.user.isVideoActive() ? <div>캠 온</div>:<div color='secondary'>캠 오프</div>}
                </div>
                <div color='inherit' className='navButton' onClick={screenShare}>
                    {props.user !== undefined && props.user.isScreenShareActive() ? <div>스크린</div> : <div>스크린x</div>}
                    {props.user !== undefined && props.user.isScreenShareActive() 
                        && <div onClick={stopScreenShare} id='navScreenButton'></div>}
                </div>
                <div color='inherit' className='navButton' onClick={switchCamera}>
                    <div>비디오 스위치</div>

                </div>
                <div color='inherit' className='navButton' onClick={toggleFullscreen}>
                    {props.user !== undefined && fullScreen? <div>풀스크린 닫기버튼</div>:<div>풀스크린 열기 버튼</div>}
                </div>
                <div color='secondary' className='navButton' onClick={leaveSession} id='navLeaveButton'>
                    <div>온오프</div>
                </div>
                <div color='inherit' onClick={toggleChat} id='navChatButton'>
                    <div id='point' className=''></div>
                </div>
            </div>
                
        </div>
    </div>
}

export default ToolbarComponent