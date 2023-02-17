import React, {useState, useEffect, useRef} from "react"
import './ToolbarComponent.css'
import styles from './ToolbarComponent.module.css'
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Mic from "@material-ui/icons/Mic"
import MicOff from "@material-ui/icons/MicOff"
import Videocam from "@material-ui/icons/Videocam"
import VideocamOff from "@material-ui/icons/VideocamOff"
import Fullscreen from "@material-ui/icons/Fullscreen"
import FullscreenExit from "@material-ui/icons/FullscreenExit"
import SwitchVideo from "@material-ui/icons/SwitchVideo"
import PictureInPicture from "@material-ui/icons/PictureInPicture"
import ScreenShare from "@material-ui/icons/ScreenShare"
import StopScreenShare from "@material-ui/icons/StopScreenShare"
import Tooltip from "@material-ui/core/Tooltip"
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew"
import QuestionAnswer from "@material-ui/icons/QuestionAnswer"
import IconButton from "@material-ui/core/IconButton"
import Assignment from "@material-ui/icons/Assignment"
import { useSelector } from 'react-redux'


const ToolbarComponent = (props) => {
    const {role} = useSelector(state=>state.auth)
    const [fullScreen, setFullScreen] = useState(false)
    const [reRender, setReRender] = useState(true)
    const time = useRef()
    const micStatusChanged=()=> {
        props.micStatusChanged()
        setReRender(!reRender)
    }
    const camStatusChanged=()=>{
        props.camStatusChanged()
        setReRender(!reRender)    }
    const screenShare=() => {
        props.screenShare()
        setReRender(!reRender)    }

    const stopScreenShare=()=> {
        props.stopScreenShare()
        setReRender(!reRender)    }
    const toggleFullscreen=()=> {
        setFullScreen(true)
        props.toggleFullscreen()
        setReRender(!reRender)    }
    const switchCamera=()=> {
        props.switchCamera()
        setReRender(!reRender)    }
    const leaveSession=()=>{
        props.leaveSession()
    }
    const toggleChat=()=>{
        props.toggleChat()
    }
    const setTimePlus = (second) => {
        if(props.timeStop) {
            if(parseInt(time.current.value)+parseInt(second)<1){
                time.current.value = 1
            } else {
                time.current.value = parseInt(time.current.value)+parseInt(second)
            }
            props.setSeconds(time.current.value)
        } else {
            props.timeSetWhile(second)
        }
    }


    return <AppBar className='toolbar' id='header'>
            <div className="logOpen">
                { role === 'trainer'? <IconButton color='inherit' onClick={props.toggleLog} className="logOpen2">
                    <Tooltip title="운동 체크">
                        <Assignment></Assignment>
                    </Tooltip>
                </IconButton>
                :
                null
                }
            </div>
                <div className='timer_buttons'>
                    <input type="number" ref={time} className="timer_button"  defaultValue={parseInt(30)}></input>
                    <button className="timer_button" onClick={() => setTimePlus(parseInt(30))}>+30초</button>
                    <button className="timer_button" onClick={() => setTimePlus(parseInt(10))}>+10초</button>
                    <button className="timer_button" onClick={() => setTimePlus(parseInt(-10))}>-10초</button>
                    {props.timeStop?<button className="timer_button" onClick={props.timerStart}>시작</button>:<button className="timer_button_stop" onClick={props.timerStop}>정지</button>}
                    <button className="timer_button" onClick={() => props.timerReset(time.current.value)}>초기화</button>
                </div>
            <div className={styles.buttonsContent}>
                <IconButton color='inherit' className='navButton' id='navMicButton' onClick={micStatusChanged}>
                    {props.user !== undefined && props.user.isAudioActive() ? <Mic></Mic>:<MicOff color='secondary'></MicOff>}

                </IconButton>
                <IconButton color='inherit' className='navButton' id='navCamButton' onClick={camStatusChanged}>
                    {props.user !== undefined && props.user.isVideoActive() ? <Videocam></Videocam>:<VideocamOff color='secondary'></VideocamOff>}
                </IconButton>
                <IconButton color='inherit' className='navButton' onClick={screenShare}>
                    {props.user !== undefined && props.user.isScreenShareActive() ? <PictureInPicture></PictureInPicture> : <ScreenShare></ScreenShare>}
                </IconButton>
                {props.user !== undefined && props.user.isScreenShareActive() 
                    && <IconButton onClick={stopScreenShare} id='navScreenButton'>
                        <StopScreenShare color="secondary"/>
                </IconButton>}

                <IconButton color='inherit' className='navButton' onClick={switchCamera}>
                    <SwitchVideo></SwitchVideo>
                </IconButton>
                <IconButton color='inherit' className='navButton' onClick={toggleFullscreen}>
                    {props.user !== undefined && fullScreen? <FullscreenExit></FullscreenExit>:<Fullscreen></Fullscreen>}
                </IconButton>
                <IconButton color='secondary' className='navButton' onClick={leaveSession} id='navLeaveButton'>
                    <PowerSettingsNew></PowerSettingsNew>
                </IconButton>
            </div>
            <div>

            </div>
            <IconButton color='inherit' onClick={toggleChat} id='navChatButton'>
                    {props.showNotification && <div id="point" className=""></div>}
                    <Tooltip title="채팅"><QuestionAnswer></QuestionAnswer></Tooltip>
            </IconButton>

    </AppBar>
}

export default ToolbarComponent