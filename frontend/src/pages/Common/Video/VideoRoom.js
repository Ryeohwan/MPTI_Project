import * as openviduBrowser from 'openvidu-browser'
import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import './VideoRoom.css'
import userModel from './userModel'
import VideoClientLog from './VideoClientLog'
import ToolbarComponent from './ToolbarComponent'
import StreamComponent from './StreamComponent'
import openviduLayout from './OpenviduLayout'
import DialogExtension from './DialogExtension'
import ChatComponent from './ChatComponent'
import HeaderComponent from './HeaderComponent'
import styles from './VideoRoom.module.css'
import { useNavigate } from 'react-router-dom'
import VideoClientReview from './VideoClientReview'
import { useSelector } from 'react-redux'
const VideoRoom = (props) => {
    const navigate = useNavigate()
    const {role} = useSelector(state => state.auth)
    const localUser = useRef(new userModel())
    const serverUrl = props.openviduServerUrl?props.openviduServerUrl:'https://i8a803.p.ssafy.io'
    const serverKey = props.openviduSecret?props.openviduSecret:'mpti'
    const userName = useState(props.user)
    const sessionName = useState(props.sessionName)
    const remotes = useRef([]);
    const layout = useRef(new openviduLayout()) 
    const [reRender,setReRender] = useState(true)
    // state
    const [showExtensionDialog, setShowExtensionDialog] = useState(false)
    const [mySessionId, setMySessionId]= useState(sessionName)
    const [myUserName,setMyUserName]= useState(userName)
    const session = useRef(undefined)
    const [messageReceived, setMessageReceived] = useState(false)
    // --------------- let
    const [hasBeenUpdated, setHasBeenUpdated] = useState(false)
    const [localUserAccessAllowed, setLocalUserAccessAllowed] = useState(false);
    //  ------------------
    const [seconds, setSeconds] = useState(30);
    const [timeStop,setTimeStop] = useState(true)
    // const [localUser, setLocalUser]= useState(undefined)
    const [subscribers, setSubscribers]= useState([])
    const [chatDisplay, setChatDisplay]= useState('none')
    const [currentVideoDevice, setCurrentVideoDevice]= useState(undefined)
    const [logDisplay, setLogDisplay] = useState('none')
    const [reviewDisplay, setReviewDisplay] = useState('none')
    const OV = useRef(undefined);
    // func 
    const joinSession = () => {
        OV.current = new openviduBrowser.OpenVidu();
        session.current=OV.current.initSession();
        subscribeToStreamCreated();
        connectToSession();
    }
    const onbeforeunload = (e) => {leaveSession()}


    // 타이머 기능
    useEffect(() => {
        const timer = timeStop?undefined
        :setInterval(() => {
            seconds>0?setSeconds((prev)=>(prev-1)):setTimeStop(true)
        },1000)

        return () => timeStop?null:clearInterval(timer)
    },[seconds, timeStop])
    const timerStart = () => {
        sendSignalTimer({type:'start', time:seconds})
    }

    const timerStop = () => {
        sendSignalTimer({type:'stop', time:seconds})
    }

    const timerReset = (value) => {
        sendSignalTimer({type:'reset', time:value})
    }

    const timeSetWhile = (value) => {
        if(seconds+value>0){
            sendSignalTimer({type:'alter', time:seconds+parseInt(value)})
        } else {
            sendSignalTimer({type:'alter', time:0})
        }
    }

    // DidMoubnt
    useEffect(()=>{
        console.log(subscribers)
        const layoutOptions = {
            maxRatio: 3 / 2,
            minRatio: 9 / 16,
            fixedRatio: false,
            bigClass: 'OV_big',
            bigPercentage: 0.8,
            bigFixedRatio: false,
            bigMaxRatio: 3 / 2,
            bigMinRatio: 9 / 16,
            bigFirst: true,
            animate: true
        }
        // layout.current.initLayoutContainer(document.getElementById('layout'), layoutOptions)
        window.addEventListener('beforeunload', onbeforeunload);

        joinSession();

        return() =>{
            window.removeEventListener('beforeunload', onbeforeunload);
            leaveSession();
        }
    },[])

    useEffect(()=>{
        console.log(subscribers, '섭스크라이버 바뀌면 체크')
        if(localUser.current){
            sendSignalUserChanged({
                isAudioActive: localUser.current.isAudioActive(),
                isVideoActive: localUser.current.isVideoActive(),
                nickname: localUser.current.getNickname(),
                isScreenShareActive: localUser.current.isScreenShareActive()
            })
        }
        checkSomeoneShareScreen();
        setReRender(prev=>!prev)
        // updateLayout()
    },[subscribers])





    const connectToSession = () =>{
        if(props.token !== undefined){
            connect(props.token)
        } else {
            getToken()
        }
    }

    const connect = (token) => {
        session.current.connect(token, {
            clientData: myUserName
        }).then(()=> connectWebCam()).catch(()=>
        console.log('웹캠 연결 못했어'))
    } 
    
    const connectWebCam = async () => {
        const devices = await OV.current.getDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const publisher = OV.current.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: videoDevices[0].deviceId,
          publishAudio: localUser.current.isAudioActive(),
          publishVideo: localUser.current.isVideoActive(),
          resolution: '640x480',
          frameRate: 30,
          insertMode: 'APPEND'
        }
        
        );
      
        if (session.current.capabilities.publish) {
          publisher.on('accessAllowed', () => {
            session.current.publish(publisher).then(() => {
              updateSubscribers();
              setLocalUserAccessAllowed(true)
            //   localUserAccessAllowed = true; 수정
              if (props.joinSession) {
                props.joinSession();
              }
            });
          });
        }
        localUser.current.setNickname(myUserName);
        localUser.current.setConnectionId(session.current.connection.connectionId);
        localUser.current.setScreenShareActive(false);
        localUser.current.setStreamManager(publisher);
        subscribeToUserChanged();
        subscribeToStreamDestroyed();
        subscribeToTimer();
        sendSignalUserChanged({
          isScreenShareActive: localUser.current.isScreenShareActive()
        });
        setCurrentVideoDevice(videoDevices[0]);
        localUser.current.getStreamManager().on('streamPlaying', (e) =>{
            // updateLayout()
            publisher.videos[0].video.parentElement.classList.remove('custom-class')
            setReRender((prev)=>!prev)
        })

      };

    const updateSubscribers = () => {
        console.log('updateSubscribers에서 setSubscribe 실행 확인', remotes.current)
        setSubscribers(remotes.current);
        setReRender((prev)=>!prev)
      }

    const leaveSession = () => {
        if(session.current) {
            session.current.disconnect();
        }
        OV.current = null;
        
        // session.current = undefined
        setSubscribers([])
        // setMySessionId('SessionA')
        // setMyUserName('트레이너')
        // localUser.current = undefined;
        console.log('여기까지 왔어')
        if(role==='user'){
            toggleReview()
        }
        else{

            navigate('/user/home')
        }
        
    }

    const camStatusChanged = () => {
        localUser.current.setVideoActive(!localUser.current.isVideoActive());
        localUser.current.getStreamManager().publishVideo(localUser.current.isVideoActive());
        sendSignalUserChanged({
            isVideoActive: localUser.current.isVideoActive()
        });
        setReRender(prev=>!prev)
    }

    const micStatusChanged = ()=> {
        localUser.current.setAudioActive(!localUser.current.isAudioActive());
        localUser.current.getStreamManager().publishAudio(localUser.current.isAudioActive());
        sendSignalUserChanged({
            isAudioActive: localUser.current.isAudioActive()
        })
    }
    const nicknameChanged = (nickname) => {
        localUser.current.setNickname(nickname)
        sendSignalUserChanged({
            nickname: localUser.current.getNickname()
        });
    }
    const deleteSubscriber = (stream) => {
        console.log('딜리트 섭스크라이븝ㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂㅂ')
        let remoteUser = subscribers
        let userStream = remoteUser.filter((user) => {
            return user.getStreamManager().stream===stream;
        })[0];
        let index = remoteUser.indexOf(userStream,0);

        if(index > -1) {
            console.log(remoteUser,'remoteUser넣는데 무엇이 들어오나')
            remoteUser.splice(index,1);
            setSubscribers((prev)=>[...prev,remoteUser]);
        }
        setReRender(prev=>!prev)
    }
    const subscribeToStreamCreated = () => {
        session.current.on('streamCreated', (e) => {
            let subscriber = session.current.subscribe(e.stream, undefined);
            subscriber.on('streamPlaying', (e) => {
                checkSomeoneShareScreen();
                setReRender((prev)=>!prev)
                // subscriber.videos[0].video.parentElement.classList.remove('custom-class')
            })
            let newUser = new userModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(e.stream.connection.connectionId);
            newUser.setType('remote')
            let nickname = e.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            remotes.current=[]
            remotes.current.push(newUser);
            console.log(newUser, remotes.current, '들어가는 것 확인')
            if(localUserAccessAllowed) {
                console.log('localUserAcess를 확인합니다.')
                updateSubscribers();
            }
            
        })

    }
    const subscribeToStreamDestroyed = () => {
        session.current.on('streamDestroyed', (e) => {
            deleteSubscriber(e.stream);
            setTimeout(() => {
                checkSomeoneShareScreen();
            }, 20)
            e.preventDefault();
            setReRender(prev=>!prev)
            // updateLayout()
        })
    }



    const subscribeToUserChanged = () => {
        session.current.on('signal:userChanged', (e) => {
            let remoteUsers = remotes.current
            console.log(e, remotes.current, subscribers, 'signal:userChanged 왔음')
            remoteUsers.forEach((user) => {
                if(user.getConnectionId() === e.from.connectionId) {
                    let  data = JSON.parse(e.data);
                    if(data.isAudioActive !== undefined){
                        user.setAudioActive(data.isAudioActive);
                    }
                    if(data.isVideoActive !== undefined){
                        user.setVideoActive(data.isVideoActive);
                    }
                    if(data.nickname !== undefined) {
                        user.setNickname(data.nickname);
                    }
                    if(data.isScreenShareActive !== undefined) {
                        user.setScreenShareActive(data.isScreenShareActive);
                    }
                }
            });
            console.log('remote유저를 subscriber에 넣기', remoteUsers)
            setSubscribers(remoteUsers)
            setReRender((prev) => !prev)
        })
    }
    
    // const updateLayout = () => {
    //     setTimeout(() => {
    //          layout.current.updateLayout()
    //     }, 20)
    // }

    const subscribeToTimer = () => {
        session.current.on('signal:Timer', (e) => {
            let remoteUsers = remotes.current
            remoteUsers.forEach((user) => {
                if(user.getConnectionId() === e.from.connectionId) {
                    const data =JSON.parse(e.data);
                    console.log(data, '여기데이터')
                    switch(data.type){
                        case 'start':
                            setSeconds(data.time)
                            setTimeStop(false)
                            break;
                        case 'stop' :
                            setSeconds(data.time)
                            setTimeStop(true)
                            break;
                        case 'reset' :
                            setSeconds(data.time)
                            break;
                        case 'alter':
                            setSeconds((prev) => data.time)
                            break;
                        default:
                            break
                    }
                }
            });
        })
    }
    const sendSignalTimer = (data) => {
        let signalOptions = {
            data: JSON.stringify(data),
            type: 'Timer'
        };
        switch(data.type){
            case 'start':
                setSeconds(data.time)
                setTimeStop(false)
                break;
            case 'stop' :
                setSeconds(data.time)
                setTimeStop(true)
                break;
            case 'reset' :
                setSeconds(data.time)
                break;
            case 'alter':
                setSeconds((prev) => data.time)
                break;
            default:
                break
        }
        console.log('타이머 시작', signalOptions.data)
        session.current.signal(signalOptions)
    }
    
// sendSignalUserChanged({type:'start', time: 30 })
// sendSignalUserChanged({type:'stop', time: 30 })
// sendSignalUserChanged({type:'reset', time: 40 })
    const sendSignalUserChanged = (data) => {
        let signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged'
        };
        console.log('유저바뀜', signalOptions.data)
        session.current.signal(signalOptions)
        setReRender(prev=>!prev)
    }

    const toggleFullscreen = () => {
        let document = window.document
        let fs = document.getElementById('container')
        console.log(fs)
        if(!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (fs.requestFullscreen) {
                fs.requestFullscreen();
            } else if (fs.msRequestFullscreen) {
                fs.msRequestFullscreen();
            } else if (fs.mozRequestFullScreen) {
                fs.mozRequestFullScreen();
            } else if (fs.webkitRequestFullscreen) {
                fs.webkitRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
              } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
              } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
        setReRender((prev) => !prev)
    }
    const switchCamera = async () => {
        try {
            const devices = await OV.current.getDevices();
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            if (videoDevices && videoDevices.length > 1) {
              const newVideoDevice = videoDevices.filter(device => device.deviceId !== currentVideoDevice.deviceId);
              if (newVideoDevice.length > 0) {
                const newPublisher = OV.current.initPublisher(undefined, {
                  audioSource: undefined,
                  videoSource: newVideoDevice[0].deviceId,
                  publishAudio: localUser.current.isAudioActive(),
                  publishVideo: localUser.current.isVideoActive(),
                  mirror: true
                });
                await session.current.unpublish(localUser.current.getStreamManager());
                await session.current.publish(newPublisher);
                localUser.current.setStreamManager(newPublisher);
                setCurrentVideoDevice(newVideoDevice);
              }
            } else {
                alert('비디오 입력장치가 1개 이하입니다!')
            }
          } catch (error) {
            console.error(error);
          }
    }

    const screenShare = () => {
        let videoSource = navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
        let publisher = OV.current.initPublisher(undefined, {
            videoSource: videoSource,
            publishAudio: localUser.current.isAudioActive(),
            publishVideo: localUser.current.isVideoActive(),
            mirror: false
        }, (e) => {
            if(e && e.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
                setShowExtensionDialog(true)
            }else if (e && e.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
                alert('Your browser does not support screen sharing');
              } else if (e && e.name === 'SCREEN_EXTENSION_DISABLED') {
                alert('You need to enable screen sharing extension');
              } else if (e && e.name === 'SCREEN_CAPTURE_DENIED') {
                alert('You need to choose a window or application to share');
            }
        })
        publisher.once('accessAllowed', () => {
            session.current.unpublish(localUser.current.getStreamManager());
            localUser.current.setStreamManager(publisher)
            session.current.publish(localUser.current.getStreamManager()).then(()=> {
            localUser.current.setScreenShareActive(true);
            sendSignalUserChanged({ isScreenShareActive : localUser.current.isScreenShareActive() })
            })
            publisher.on('streamPlaying', () => {
                // updateLayout();
                publisher.videos[0].video.parentElement.classList.remove('custom-class');
            })
    });setReRender(prev=>!prev);}

    const closeDialogExtension = () => {
        setShowExtensionDialog(false)
    }
    
    const stopScreenShare = () => {
        session.current.unpublish(localUser.current.getStreamManager());
        connectWebCam();
    }

    const checkSomeoneShareScreen = () => {
        let isScreenShared;
        isScreenShared = subscribers.some((user) => {
            return user.isScreenShareActive();
        }) || localUser.current.isScreenShareActive();
        let openviduLayoutOptions = {
            maxRatio: 3 / 2,
            minRatio: 9 / 16,
            fixedRatio: isScreenShared,
            bigClass: 'OV_big',
            bigPercentage: 0.8,
            bigFixedRatio: false,
            bigMaxRatio: 3 / 2,
            bigMinRatio: 9 / 16,
            bigFirst: true,
            animate: true
        }
        setReRender(prev=>!prev)
        // layout.current.setLayoutOptions(openviduLayoutOptions);
        // updateLayout();
    }

    const toggleChat = (property) => {
        let display = property;
        if(display === undefined) {
            display = chatDisplay === 'none' ? 'block' : 'none';
        }
        
        if (display === 'block') {
            setChatDisplay(display)
            setMessageReceived(false)
          } else {
            setChatDisplay(display)
          }
        //   updateLayout();
    }

    // 토글 로그
    const toggleLog = () => {
        logDisplay==='none'?setLogDisplay('block'):setLogDisplay('none')
    }
    const toggleReview = () => {
        reviewDisplay==='none'?setReviewDisplay('block'):setReviewDisplay('none')
    }


    const checkNotification = (e) => {
        setMessageReceived(chatDisplay === 'none')
    }

    const checkSize = () => {
        if(document.getElementById('layout').offsetWidth <= 700 && !hasBeenUpdated) {
            toggleChat('none')
            setHasBeenUpdated(true)
            // HasBeenUpdated = true; 여기서 수정
        }
        if (document.getElementById('layout').offsetWidth > 700 && hasBeenUpdated) {
            setHasBeenUpdated(false)
            // hasBeenUpdated = false; 여기서 수정
          }
    }

    return(
        <div id='container' className={styles.container}>
            <div className={styles.container2}>

            <HeaderComponent
                seconds={seconds}/>

                <DialogExtension
                showDialog = {showExtensionDialog}
                cancelClicked = {closeDialogExtension}
                />
                <VideoClientLog
                    logDisplay={logDisplay}
                    toggleLog={toggleLog}
                    trainerId={props.trainerId}
                    clientId={props.clientId}
                />
                <VideoClientReview
                    // reviewDisplay={reviewDisplay}
                    // toggleReview={toggleReview}
                    reviewDisplay={reviewDisplay}
                    trainerId={props.trainerId}
                    clientId={props.clientId}
                    clientName={props.clientName}
                    trainerName={props.trainerName}
                >

                </VideoClientReview>
                {/* 비디오 담는 박스 */}
            <div id='middle_box' className={styles.container_body}>  

                {localUser.current !== undefined
                && localUser.current.getStreamManager() !== undefined
                && <div id='localUser' className={styles.localVideo}>
                    <StreamComponent
                    user={localUser.current}
                    handleNickname={nicknameChanged}
                    reRender={reRender}
                    />
                    {/* <div>{userName}</div> */}
                    </div>
                }

                {subscribers.map((sub, index) => {
                    console.log(sub.nickname[0],index,'섭스크라이브 확인');
                    return <div key={index} className={styles.remoteVideo} id='remoteUsers'>
                            <StreamComponent 
                            user={sub} 
                            streamId={sub.streamManager.stream.streamId}
                            reRender={reRender}
                            />
                            {/* <div>{sub.nickname.length?sub.nickname[0]:'유저'}</div> */}
                        </div>
                    })
                }


            </div>
                {
                    localUser.current !== undefined 
                    && localUser.current.getStreamManager() !== undefined
                    && <div className="OT_root OT_publisher custom-class" style={{display:chatDisplay}}>
                            <ChatComponent
                            user={localUser.current}
                            chatDisplay={chatDisplay}
                            close={toggleChat}
                            messageReceived={checkNotification}/>
                        </div>
                }
            <ToolbarComponent
            sessionId= {mySessionId}
            user= {localUser.current}
            showNotification= {messageReceived}
            camStatusChanged={camStatusChanged}
            micStatusChanged= {micStatusChanged}
            screenShare= {screenShare}
            stopScreenShare= {stopScreenShare}
            toggleFullscreen= {toggleFullscreen}
            switchCamera= {switchCamera}
            leaveSession= {leaveSession}
            toggleChat= {toggleChat}
            toggleLog={toggleLog}
            toggleReview ={toggleReview}
            setSeconds={setSeconds}
            timerStart={timerStart}
            timerStop={timerStop}
            timerReset={timerReset}
            timeStop = {timeStop}
            timeSetWhile= {timeSetWhile}
            />
            </div>
        </div>
    )

    async function getToken() {
        return await createSession(mySessionId)
            .then((sessionId)=> { return createToken(sessionId)})
            .catch((Err)=>console.error(Err))
    }
    async function createSession(sessionId) {
        const data = JSON.stringify({customSessionId: sessionId});
        
        return axios.post(serverUrl+'/openvidu/api/sessions', data, {
            headers: {
                Authorization:'Basic ' + btoa('OPENVIDUAPP:' + serverKey),
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {

            return (response.data.id); //resolve
        })
        .catch((response => {
            const error = Object.assign({}, response);
            if (error.response && error.response.status === 409){
                
                return (sessionId); //resolve
            } else {
                console.log(error);
                console.warn('연결 못했습니다.');
                if ( window.confirm('certificate문제로 연결 못했습니다. OK 누르세요 ')) {
                    window.location.assign(serverUrl + '/accept-certificate');
                }
            }
        }))
    }

    async function createToken(sessionId) {
        const data = JSON.stringify({});
        return  axios
            .post(serverUrl+'/openvidu/api/sessions/'+ sessionId + '/connection', data, {
                headers: {
                    Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + serverKey),
                    'Content-Type': 'application/json',
                },
        })
        .then((response) => {
            return (response.data.token); //resolve
        })
        .catch((error)=> console.log(error));
    }
    
}


export default VideoRoom