import React, {useState} from 'react'
import styles from './MyPageProfile.module.css'
import axios from 'axios'

const MyPageProfile = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [picture, setPicture] = useState(null);

    const onChange = (e) => {
        const file = e.target.files;
        setPicture(file[0]);
        console.log(file[0])
    }
    const handlePictureUpload=async (e)=>{
        const formData =await new FormData();
        formData.append('email','arh999@aaa.com')
        await formData.append('file', picture)
        axios.post('/api/user/upload', formData).then((res) => {setShowModal(false)}).catch((err)=> 
        alert('파일이 비었어요'))

    } 
    return(
        <div className={styles.MyPage_body_profile}>
            {showModal && 
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        {picture && <div className={styles.MyPage_body_profile_box}><img className={styles.picture} src={window.URL.createObjectURL(picture)} alt='사진'></img></div>}
                        <div className={styles.row_flex}>
                            <input class={styles.upload_name} value="첨부파일" placeholder="첨부파일"></input>
                            <label class={styles.upload_label} htmlFor='file'>파일 찾기</label>
                            <input id='file' className={styles.picture_upload} type="file" placeholder='파일' onChange={onChange}  accept="image/*"/>
                        </div>
                        <div className={`${styles.row_flex} ${styles.button_box}`}>
                            <button className={styles.button_upload} onClick={() => {handlePictureUpload()}}>Submit</button>
                            <button className={styles.button_back} onClick={() => {setShowModal(false); setPicture(null)}}>Close</button>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.MyPage_body_profile_box}>
                <img className={styles.picture} src='/profilepic.png'></img>
                <img className={styles.camera} src='/camera.png' alt='camera' onClick={() => setShowModal(!showModal)}></img>
            </div>
            <div className={styles.name}>{props.name} <span className={styles.name2}>{props.role}</span></div>

        </div>
    );
}


export default MyPageProfile