import React from 'react';
import styles from './ClientProfile.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { etcActions, trainerDetail, getChatRoom } from '../../../store/etc';
const ClientProfile = (props) => {
    console.log("wls", props);
    const dispatch = useDispatch()
    const {name, id, role} = useSelector((state) => state.auth)
    const goChat = async () => {
        console.log('고객정보', props)
        const roomId = await dispatch(getChatRoom(id, role, name, props.id, props.name))
        dispatch(etcActions.chatToggle())
        dispatch(etcActions.chatEnter({type:'enter', payload:roomId}))
        dispatch(etcActions.chatTarget(props.name))
        return roomId
      }

    return(
        <div className={styles.MyPage_body_profile}>
            <div className={styles.MyPage_body_profile_box}>
                <img className={styles.picture} src={props.image}></img>
            </div>
            <div className={styles.name}>{props.name} <span className={styles.name2}>회원님</span></div>
            <div>({props.gender ==='F'?"여":"남" }) {props.age}세</div>
            <button className={styles.button_chat} onClick={()=>goChat()}>채팅하기<img src='/message_icon.png'></img></button>
        </div>
    )
}

export default ClientProfile;