import React, { useState } from "react"
import OvVideo from "./OvVideo"
import MicOff from "@material-ui/icons/MicOff"
import VideocamOff from "@material-ui/icons/VideocamOff"
import VolumeUp from "@material-ui/icons/VolumeUp"
import VolumeOff from "@material-ui/icons/VolumeOff"
import FormControl from "@material-ui/core/FormControl"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import IconButton from "@material-ui/core/IconButton"
import HighlightOff from "@material-ui/icons/HighlightOff"
import FormHelperText from "@material-ui/core/FormHelperText"
import styles from './StreamComponent.module.css'
const StreamComponent = (props) => {
    console.log(props, 'StreamComponent 내부 확인')
    const [nickname, setNickname] = useState(props.user.getNickname())
    const [showForm, setShowForm] = useState(false)
    const [mutedSound, setMutedSound] = useState(false)
    const [isFormValid, setIsFormValid] = useState(true)
    console.log(props, '상대? 유저데이터')
    // const handleChange = (e) => {
    //     setNickname(e.target.value)
    //     e.preventDefault();
    // };

    // const toggleNicknameForm = () => {
    //     if(props.user.isLocal()) {
    //         setShowForm(!showForm)
    //     }
    // }

    const toggleSound = () => {
        setMutedSound(!mutedSound)
    }

    // const handlePressKey = (e) => {
    //     if(e.key === 'Enter') {
    //         if(nickname.length >= 3 && nickname.length <=20) {
    //             props.handleNickname(nickname);
    //             toggleNicknameForm();
    //             setIsFormValid(true)
    //         } else {
    //             setIsFormValid(false)
    //         }
    //     }
    // }

    return <div className="">
        {
            props.user !== undefined && props.user.getStreamManager() !== undefined
            ?
            <div className={styles.video_box}>
                {/* <div className="pointer nickname">
                    {showForm?                    <FormControl id="nicknameForm">
                        <IconButton id="closeButton" color="inherit" onClick={toggleNicknameForm}></IconButton>
                    </FormControl>:null}</div> */}
                <OvVideo user={props.user} mutedSound={mutedSound} className={styles.video_box}>
                    <div id='statusIcons' className={styles.video_box}>
                        {!props.user.isVideoActive()
                        ?
                        <div id='camIcon'>
                            <VideocamOff id="statusCam"/>
                        </div>
                        :
                        null
                        }
                        {!props.user.isAudioActive() 
                        ? 
                        <div id='micIcon'>
                            <MicOff id="statusMic"/>
                        </div>
                        :
                        null
                        }
                        <div>
                        {!props.user.isLocal()
                        && <IconButton id = "volumeButton" onClick={toggleSound}>
                            {mutedSound?<VolumeOff color="secondary"></VolumeOff>:<VolumeUp></VolumeUp>}
                        </IconButton>}
                        </div>
                    </div>
                </OvVideo>
            </div>
            :
            null
        }
    </div>
}

export default StreamComponent