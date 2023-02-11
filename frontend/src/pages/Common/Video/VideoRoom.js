import * as openviduBrowser from 'openvidu-browser'
import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import styles from './VideoRoom.module.css'
import './VideoRoom.css'
import userModel from './userModel'

import ToolbarComponent from './ToolbarComponent'
import StreamComponent from './StreamComponent'
import OvVideo from './OvVideo'
import openviduLayout from './OpenviduLayout'
import DialogExtension from './DialogExtension'
import ChatComponent from './ChatComponent'


const VideoRoom = (props) => {
    const localUser = useRef(new userModel())
    const serverUrl = props.openviduServerUrl?props.openviduServerUrl:'https://i8a803.p.ssafy.io'
    const serverKey = props.openviduSecret?props.openviduSecret:'mpti'
    const userName = props.user
    const sessionName = props.sessionName
    const remotes = useRef([]);
    const layout = useRef(new openviduLayout())
    // state
    const [showExtensionDialog, setShowExtensionDialog] = useState(false)
    const [mySessionId, setMySessionId]= useState(sessionName)
    const [myUserName,setMyUserName]= useState(userName)
    const session = useRef(undefined)
    const [messageReceived, setMessageReceived] = useState(false)
    let hasBeenUpdated = false
    let localUserAccessAllowed = false;
    // const [localUser, setLocalUser]= useState(undefined)
    const [subscribers, setSubscribers]= useState([])
    const [chatDisplay, setChatDisplay]= useState('none')
    const [currentVideoDevice, setCurrentVideoDevice]= useState(undefined)
    const OV = useRef(undefined);


    // func 
    const joinSession = () => {
        console.log('2번 joinSession 함수 안에 도착')
        OV.current = new openviduBrowser.OpenVidu();
        console.log('joinSession 함수에서 OV.cuurnt 할당', OV.current.initSession())
        session.current=OV.current.initSession()
        console.log('subscribeToStreamCreated 함수 실행')
        subscribeToStreamCreated()
        connectToSession()
    }
    const onbeforeunload = (e) => {leaveSession()}



    // DidMoubnt
    useEffect(()=>{
        console.log('video 마운트')
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
        console.log(layout.current.initLayoutContainer, '레이아웃')
        layout.current.initLayoutContainer(document.getElementById('layout'), layoutOptions)
        window.addEventListener('beforeunload', onbeforeunload);
        window.addEventListener('resize', updateLayout);
        window.addEventListener('resize', checkSize);
        console.log('1번 조인 시작')
        joinSession();

        return() =>{
            window.removeEventListener('beforeunload', onbeforeunload);
            window.removeEventListener('resize', updateLayout);
            window.removeEventListener('resize', checkSize);
            leaveSession();
        }
    },[])


    useEffect(()=>{
        console.log('여기 왜오니', localUser.current)
        if(localUser.current){
            sendSignalUserChanged({
                isAudioActive: localUser.current.isAudioActive(),
                isVideoActive: localUser.current.isVideoActive(),
                nickname: localUser.current.getNickname(),
                isScreenShareActive: localUser.current.isScreenShareActive()
            })
        }
        checkSomeoneShareScreen();
        updateLayout()
        console.log(subscribers,'확인용')
    },[subscribers])
    console.log(subscribers, '확인용2')





    const connectToSession = () =>{
        console.log(props,'connetionToSession')
        if(props.token !== undefined){
            console.log('토큰 받음:', props.token)
            connect(props.token)
        } else {
            getToken()
            console.log('토큰이 없어서 받았습니다..')
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
            console.log('localUser true')
              localUserAccessAllowed = true;
              if (props.joinSession) {
                props.joinSession();
              }
            });
          });
        }
        console.log(publisher, '스트림매니저')
        localUser.current.setNickname(myUserName);
        localUser.current.setConnectionId(session.current.connection.connectionId);
        localUser.current.setScreenShareActive(false);
        localUser.current.setStreamManager(publisher);
        subscribeToUserChanged();
        subscribeToStreamDestroyed();
        sendSignalUserChanged({
          isScreenShareActive: localUser.current.isScreenShareActive()
        });
        setCurrentVideoDevice(videoDevices[0]);
        localUser.current.getStreamManager().on('streamPlaying', (e) =>{
            updateLayout()
            publisher.videos[0].video.parentElement.classList.remove('custom-class')
        })
      };

    // const connectWebCam = () => {
    //     let devices, videoDevices, publisher;
    //     const callee = async(context) => {
    //         while(1){
    //             switch(context){
    //                 case 1:
    //                     context = 2;
    //                     return OV.current.getDevice();
    //                 case 2:
    //                     devices = context.sent;
    //                     videoDevices = devices.filter((device) => {
    //                         return device.kind === 'videoinput';
    //                     });
    //                     publisher = OV.current.initPublisher(undefined, {
    //                         audioSource: undefined,
    //                         videoSource: videoDevices[0].deviceId,
    //                         publishAudio: localUser.isAudioActive(),
    //                         publishVideo: localUser.isVideoActive(),
    //                         resolution: '640x480',
    //                         frameRate: 30,
    //                         insertMode: 'APPEND'
    //                     });

    //                     if(session.capabilities.publish) {
    //                         publisher.on('accessAllowed', () => {
    //                             session.publish(publisher).then(() =>{
    //                                 updateSubscriber();
    //                                 localUserAccessAllowed = true;
    //                                 if(joinSession){
    //                                     props.joinSession()
    //                                 }
    //                             });
    //                         });
    //                     }
    //                     localUser.setNickname(myUserName);
    //                     localUser.setConnectionId(session.connection.connectionId);
    //                     localUser.setScreenShareActive(false);
    //                     localUser.setStreamManager(publisher);
    //                     subscribeToUserChanged();
    //                     subscribeToStreamDestroyed();
    //                     sendSignalUserChanged({
    //                       isScreenShareActive: localUser.isScreenShareActive()
    //                     });
    //                     setCurrentVideoDevice(videoDevices[0]);
    //                     setLocalUser(localUser);
    //                 default:
    //                     return context.stop()
    //                 }
    //         }
    //     }
    // }
    const updateSubscribers = () => {
        console.log(remotes.current, 'set할 내용')
        let subscribers = remotes.current;
        setSubscribers(subscribers);
      }

    const leaveSession = () => {
        let mySession = session.current;
        if(mySession) {
            mySession.disconnect();
        }

        OV.current = null;
        session.current = undefined
        setSubscribers([])
        setMySessionId('SessionA')
        setMyUserName('트레이너')
        localUser.current = undefined;
    }

    const camStatusChanged = () => {
        localUser.current.setVideoActive(!localUser.current.isVideoActive());
        localUser.current.getStreamManager().publishVideo(localUser.current.isVideoActive());
        sendSignalUserChanged({
            isVideoActive: localUser.current.isVideoActive()
        });
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
        let remoteUser = subscribers
        let userStream = remoteUser.filter((user) => {
            return user.getStreamManager().stream===stream;
        })[0];
        let index = remoteUser.indexOf(userStream,0);

        if(index > -1) {
            remoteUser.splice(index,1);
            setSubscribers(remoteUser);
        }
    }
    const subscribeToStreamCreated = () => {
        console.log('3번 세션 확인')
        session.current.on('streamCreated', (e) => {
            console.log(e,'session.current.on 시행')
            let subscriber = session.current.subscribe(e.stream, undefined);
            subscriber.on('streamPlaying', (e) => {
                checkSomeoneShareScreen();
                subscriber.videos[0].video.parentElement.classList.remove('custom-class')
            })
            let newUser = new userModel();
            newUser.setStreamManager(subscriber);
            newUser.setConnectionId(e.stream.connection.connectionId);
            newUser.setType('remote')
            let nickname = e.stream.connection.data.split('%')[0];
            newUser.setNickname(JSON.parse(nickname).clientData);
            remotes.current.push(newUser);
            if(localUserAccessAllowed) {
                console.log('allowed')
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
            updateLayout()
        })
    }

    const subscribeToUserChanged = () => {
        session.current.on('signal:userChanged', (e) => {
            let remoteUsers = subscribers;
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
            setSubscribers(remoteUsers)
        })
    }
    
    const updateLayout = () => {
        setTimeout(() => {
             layout.current.updateLayout()
        }, 20)
    }

    const sendSignalUserChanged = (data) => {
        let signalOptions = {
            data: JSON.stringify(data),
            type: 'userChanged'
        };
        session.current.signal(signalOptions)
    }

    const toggleFullscreen = () => {
        let document = window.document
        let fs = document.getElementById('container')
        
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
            }
          } catch (error) {
            console.error(error);
          }
    }

    const screenShare = () => {
        let videoSource = navigator.userAgent.indexOf('Firefox') !== 1 ? 'window' : 'screen';
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
        });
        publisher.once('accessAllowed', () => {
            session.current.unpublish(localUser.current.getStreamManager());
            localUser.current.setStreamManager(publisher)
            session.current.publish(localUser.current.getStreamManager()).then(()=> {
            localUser.current.setScreenShareActive(true);
            sendSignalUserChanged({ isScreenShareActive : localUser.current.isScreenShareActive() })
            })
            publisher.on('streamPlaying', () => {
                updateLayout();
                publisher.video[0].video.parentElement.classList.remove('custom-class');
            })
    })}

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
        layout.current.setLayoutOptions(openviduLayoutOptions);
        updateLayout();
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
            console.log('chat', display);
            setChatDisplay(display)
          }
          updateLayout();
    }

    const checkNotification = () => {
        setMessageReceived(chatDisplay === 'none')
    }

    const checkSize = () => {
        if(document.getElementById('layout').offsetWidth <= 700 && !hasBeenUpdated) {
            toggleChat('none')
            hasBeenUpdated = true;
        }
        if (document.getElementById('layout').offsetWidth > 700 && hasBeenUpdated) {
            hasBeenUpdated = false;
          }
    }

    console.log('111',localUser.current.getStreamManager(), subscribers)
    return(
        <div id='container' className='container'>
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
            />

            <DialogExtension
            showDialog = {showExtensionDialog}
            cancelClicked = {closeDialogExtension}
            />

            <div id="layout" className='bounds'>
                {localUser.current !== undefined
                && localUser.current.getStreamManager() !== undefined
                && <div id='localUser' className='OT_root OT_publisher custom-class'>
                    <StreamComponent
                    user={localUser.current}
                    handleNickname={nicknameChanged}
                    />
                    </div>
                }

                {subscribers.map((sub, index) => {
                    return <div key={index} className='OT_root OT_publisher custom-class' id='remoteUsers'>
                            <StreamComponent 
                            user={sub} 
                            streamId={sub.streamManager.stream.streamId}/>
                        </div>
                    })
                }

                {
                    localUser.current !== undefined
                    && localUser.current.getStreamManager() !== undefined
                    && <div className='OT_root OT_publisher custom-class' style={{chatDisplay}}>
                            <ChatComponent
                            user={localUser.current}
                            chatDisplay={chatDisplay}
                            close={toggleChat}
                            messageReceived={checkNotification}/>
                        </div>
                }
            </div>

        </div>
    )

    async function getToken() {
        return await createSession(mySessionId)
            .then((sessionId)=> { console.log(444);return createToken(sessionId)})
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
            console.log('세션을 만들었습니다 - ',response);
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
            console.log('TOKEN :', response.data);
            return (response.data.token); //resolve
        })
        .catch((error)=> console.log(error));
    }
    
}






export default VideoRoom