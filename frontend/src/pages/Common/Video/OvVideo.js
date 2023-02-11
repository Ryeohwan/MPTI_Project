import React from "react"
import { useRef, useEffect } from "react"
const OvVideo = (props) => {
    const video = useRef()
    console.log(props, '축가')
    useEffect(()=>{
        if (props && props.user.streamManager && !!video.current) {
            console.log('PROPS: ', props);
            props.user.getStreamManager().addVideoElement(video.current);
          }
    
          if (props && props.user.streamManager.session && props.user && !!video) {
            props.user.streamManager.session.on('signal:userChanged', (event) => {
              let data = JSON.parse(event.data);
    
              if (data.isScreenShareActive !== undefined) {
                props.user.getStreamManager().addVideoElement(video.current);
              }
            });
          }
    },[])
    console.log(video)
    console.log(props.user.getStreamManager(),123123123123)
    
    // 여기는 !한개면 됌.
    if(props && !!video.current){
        console.log('여기여기')
        console.log(props.user.getStreamManager())
        console.log(video.current)
        props.user.getStreamManager().addVideoElement(video.current)
    }


    console.log('비디오',props.user.getStreamManager().stream)
    return <div>
        <video id={`video-${props.user.getStreamManager().stream.streamId}`} ref={video} autoPlay={true} muted={props.mutedSound}/>
    </div>
}

export default OvVideo