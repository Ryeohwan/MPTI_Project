import React, { useState } from "react"
import OvVideo from "./OvVideo"

const StreamComponent = (props) => {
    const [nickname, setNickname] = useState(props.user.getNickname())
    const [showForm, setShowForm] = useState(false)
    const [mutedSound, setMutedSound] = useState(false)
    const [isFormValid, setIsFormValid] = useState(true)
    console.log(props.user, '유저데이터')
    const handleChange = (e) => {
        setNickname(e.target.value)
        e.preventDefault();
    };

    const toggleNicknameForm = () => {
        if(props.user.isLocal()) {
            setShowForm(!showForm)
        }
    }

    const toggleSound = () => {
        setMutedSound(!mutedSound)
    }

    const handlePressKey = (e) => {
        if(e.key === 'Enter') {
            if(nickname.length >= 3 && nickname.length <=20) {
                props.handleNickname(nickname);
                toggleNicknameForm();
                setIsFormValid(true)
            } else {
                setIsFormValid(false)
            }
        }
    }
    return <div className="OT_widget-container">
        <div className="pointer nickname">
            {showForm? 
            <div id='nicknameForm'>
                <button id='closeButton' onClick={toggleNicknameForm} color='inherit'>
                    <label htmlFor="name-simple" id="label">Nickname</label>
                    <input color="inherit" id="input" value={nickname} onChange={handleChange} onKeyPress={handlePressKey} required>
                        {!isFormValid && nickname.length <=3 && <div id="name-error-text">닉네임이 짧아요</div>}
                        {!isFormValid && nickname.length >= 20 && <div id="name-error-text">닉네임이 너무 길어요</div>}
                    </input>
                </button>
            </div>
            :
            <div id="nickname">
                {props.user.getNickname() && <span> (edit)</span>}
            </div>
            }
        </div>
        {
            props.user !== undefined && props.user.getStreamManager() !== undefined
            ?
            <div className="streamComponent">
                <OvVideo user={props.user} mutedSound={mutedSound}>
                    <div id='statusIcons'>
                        {!props.user.isVideoActive()
                        ?
                        <div id='camIcon'> 
                        캠온
                            <div id="statusCam">
                                캠 상태
                            </div>
                        </div>
                        :
                        null
                        }

                        {!props.user.isAudioActive() 
                        ? 
                        <div id='micIcon'>
                            마이크온
                            <div id="statusMic">
                                마잌
                            </div>
                        </div>
                        :
                        null
                        }

                        <div>
                        {!props.user.isLocal()
                        && <div id = "volumeButton" onClick={toggleSound}>
                            {mutedSound?<div color="secondary">소리온</div>:<div>소리오프</div>}
                        </div>}

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