import styles from './ClientMyPageProfile.module.css'

const ClientMyPageProfile = () => {

    return(
        <div className={styles.ClientMyPage_body_profile}>
            <div className={styles.ClientMyPage_body_profile_box}>
                <img className={styles.picture} src='/profilepic.png'></img>
                <img className={styles.camera} src='/camera.png'></img>
            </div>
            <div className={styles.name}>정 원 철 <span className={styles.name2}>회원</span></div>
        </div>
    );
}


export default ClientMyPageProfile