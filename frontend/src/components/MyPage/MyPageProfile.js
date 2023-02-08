import React, {useEffect, useState} from 'react'
import styles from './MyPageProfile.module.css'
import axios from 'axios'

const user_url ='/api/user/upload'
const trainer_url = '/api/trainer/...'


const MyPageProfile = ({userInfo}) => {
    const [showModal, setShowModal] = useState(false);
    const [uploadPicture, setUploadPicture] = useState(null);
    const s3Url = userInfo.s3Url
    const name = userInfo.name
    const email = userInfo.email
    const role = 'user'
    const onChange = (e) => {
        const file = e.target.files;
        setUploadPicture(file[0]);
    }

    const handlePictureUpload=async (e)=>{
        const formData =await new FormData();
        console.log(email)
        formData.append('email', email)
        formData.append('file', uploadPicture)
        if(role==='user'){
            axios.post(user_url, formData).then((res) => {setShowModal(false)}).catch((err)=> 
            alert('오류'))
        }

        else{
            console.log('트레이너')
        }
    }   


    return(
        <div className={styles.MyPage_body_profile}>
            {showModal && 
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        {uploadPicture && <div className={styles.MyPage_body_profile_box}><img className={styles.picture} src={window.URL.createObjectURL(uploadPicture)} alt='사진'></img></div>}
                        <div className={styles.row_flex}>
                            <input className={styles.upload_name} value={uploadPicture?uploadPicture.name:"첨부파일"} readOnly></input>
                            <label className={styles.upload_label} htmlFor='file'>파일 찾기</label>
                            <input id='file' className={styles.picture_upload} type="file" placeholder='파일' onChange={onChange}  accept="image/*"/>
                        </div>
                        <div className={`${styles.row_flex} ${styles.button_box}`}>
                            <button className={styles.button_upload} onClick={() => {handlePictureUpload()}}>Submit</button>
                            <button className={styles.button_back} onClick={() => {setShowModal(false); setUploadPicture(null)}}>Close</button>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.MyPage_body_profile_box}>
                <img className={styles.picture} src={s3Url?s3Url:'/profile_base.png'} alt='profile_pic'></img>
                <img className={styles.camera} src='/camera.png' alt='camera' onClick={() => setShowModal(!showModal)}></img>
            </div>
            <div className={styles.name}>{name} <span className={styles.name2}>{role}</span></div>

        </div>
    );
}


export default MyPageProfile