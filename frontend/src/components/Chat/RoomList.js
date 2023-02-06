import styles from './RoomList.module.css'

export default function RoomList(props) {
    const {channelId, user, content, enter_chat_room} = props
    return(
        <div className={styles.room_box} onClick={() => enter_chat_room(channelId)}>
            <div className={styles.room_profile}>{user}</div>
            <div className={styles.room_content}> {content}</div>
            {/* <div className={styles.room_time_box}><span className={styles.room_time}>{props.time}</span></div> */}
        </div>
    )


}