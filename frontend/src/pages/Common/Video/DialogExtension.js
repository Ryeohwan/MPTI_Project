import React, { useState } from "react"
import './DialogExtension.css'
const DialogExtension = (props) => {

    const openviduExtensionUrl = 'https://chrome.google.com/webstore/detail/openvidu-screensharing/lfcgfepafnobdloecchnfaclibenjold';
    const [isInstalled,setIsInstalled] = useState(false)
    
    const onNoClick = () => {
        props.cancelClicked();
    }
    
    const goToChromePage = () => {
        window.open(openviduExtensionUrl);
        setIsInstalled(true)
    }

    const refreshBrowser = () => {
        window.location.reload()
    }
    
    return <div>
        {props && props.showDialog ? 
        <div id="dialogExtension">
            <div id="card">
                <div> 
                    <div color="textSecondary">Hello</div>
                    <div color="textSecondary">You need install this chrome extension and refresh the browser for can share your screen.</div>
                </div>
                <div>
                    <button onClick={onNoClick}>
                        취소
                    </button>
                    <button onClick={goToChromePage}>
                        설치
                    </button>
                    {isInstalled? <button onClick={refreshBrowser}>새로고침</button>:null}
                </div>
            </div>
        </div>:null}
    </div>
}

export default DialogExtension