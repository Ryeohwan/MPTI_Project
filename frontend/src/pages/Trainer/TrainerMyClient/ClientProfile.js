import styles from './ClientProfile.module.css'


const ClientProfile = (props) => {


    return(
        <div className={styles.MyPage_body_profile}>
            <div className={styles.MyPage_body_profile_box}>
                <img className={styles.picture} src={props.image}></img>
            </div>
            <div className={styles.name}>{props.name} <span className={styles.name2}>회원님</span></div>
            <div>(여) 26세</div>
            <button className={styles.button_chat}>채팅하기<img src='/message_icon.png'></img></button>
        </div>
    )
}

export default ClientProfile