import styles from './RoomList.module.css'
import { useDispatch } from 'react-redux'
export default function RoomList(props) {
    const {channelId, user, content, enter_chat_room, userId, date} = props
    const showDate = date.split('T')[1].slice(0,5)

    return(
        <div className={styles.room_box} onClick={() => enter_chat_room(channelId, user)}>
            <div className={styles.room_profile}><div>{user} 님</div> <div>{showDate}</div></div>
            <div className={styles.room_content}> {content}</div>
            {/* <div className={styles.room_time_box}><span className={styles.room_time}>{props.time}</span></div> */}
        </div>
    )


}