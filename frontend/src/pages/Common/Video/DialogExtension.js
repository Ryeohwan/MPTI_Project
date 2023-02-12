import React, { useState } from "react"
import './DialogExtension.css'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
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
            <Card id="card">
                <CardContent> 
                    <Typography color="textSecondary">Hello</Typography>
                    <Typography color="textSecondary">You need install this chrome extension and refresh the browser for can share your screen.</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={onNoClick}>
                        취소
                    </Button>
                    <Button onClick={goToChromePage}>
                        설치
                    </Button>
                    {isInstalled? <Button onClick={refreshBrowser}>새로고침</Button>:null}
                </CardActions>
            </Card>
        </div>:null}
    </div>
}

export default DialogExtension