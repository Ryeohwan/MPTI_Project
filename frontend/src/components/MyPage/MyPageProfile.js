import styles from './MyPageProfile.module.css'

const MyPageProfile = (props) => {

    return(
        <div className={styles.MyPage_body_profile}>
            <div className={styles.MyPage_body_profile_box}>
                <img className={styles.picture} src='/profilepic.png'></img>
                <img className={styles.camera} src='/camera.png'></img>
            </div>
            <div className={styles.name}>{props.name} <span className={styles.name2}>{props.role}</span></div>

        </div>
    );
}


export default MyPageProfile