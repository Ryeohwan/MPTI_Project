import styles from './ChatList.module.css'

export default function ChatList(props) {
    const {id, channelId, writer, content, hour, minute, me} = props
    if(!me)
        return(
        <div className={styles.chat_box}>
            <div className={styles.name}>{writer}</div>
            <div className={styles.content_box}>
                <div className={styles.talk_content}> {content}</div>
                <div className={styles.time_box}><span className={styles.time}>{hour}:{minute}</span></div>
            </div>
        </div> 
        )
    else
        return(
            <div className={styles.chat_box2}>
                <div className={styles.name}>{writer}</div>
                <div className={styles.content_box}>
                    <div className={styles.time_box}><span className={styles.time}>{hour}:{minute}</span></div>
                    <div className={styles.talk_content}> {content}</div>
                </div>
            </div>
        )
}