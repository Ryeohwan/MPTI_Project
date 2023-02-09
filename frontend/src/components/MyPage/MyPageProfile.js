import React, {useEffect, useState} from 'react'
import styles from './MyPageProfile.module.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import etc from '../../store/etc'

const user_url ='/api/user/upload'
const trainer_url = '/api/trainer/upload'

const MyPageProfile = () => {
    const {name, email, role, s3url} = useSelector((state) => state.etc)
    const [showModal, setShowModal] = useState(false);
    const [uploadPicture, setUploadPicture] = useState(null);

    const handlePictureUpload=async (e)=>{
        const formData =await new FormData();
        formData.append('email', email)
        formData.append('file', uploadPicture)
        if(role==='ROLE_USER'){
            axios.post(user_url, formData).then((res) => {setShowModal(false);console.log(res.data)}).catch((err)=> 
            alert('오류'))
        }
        else if(role==='ROLE_TRAINER'){
            axios.post(trainer_url, formData).then((res)=>{setShowModal(false)}).catch((err)=>
            alert('오류'))
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
                            <input id='file' className={styles.picture_upload} type="file" placeholder='파일' onChange={(e) => setUploadPicture(e.target.files[0])}  accept="image/*"/>
                        </div>
                        <div className={`${styles.row_flex} ${styles.button_box}`}>
                            <button className={styles.button_upload} onClick={() => {handlePictureUpload()}}>변경</button>
                            <button className={styles.button_back} onClick={() => {setShowModal(false); setUploadPicture(null)}}>취소</button>
                        </div>
                    </div>
                </div>
            }
            <div className={styles.MyPage_body_profile_box}>
                <img className={styles.picture} src={s3url?s3url:'/profile_base.png'} alt='profile_pic'></img>
                <img className={styles.camera} src='/camera.png' alt='camera' onClick={() => setShowModal(!showModal)}></img>
            </div>
            <div className={styles.name}>{name} <span className={styles.name2}>{role}</span></div>

        </div>
    );
}


export default MyPageProfile