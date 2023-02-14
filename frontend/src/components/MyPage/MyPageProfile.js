import React, {useEffect, useState} from 'react'
import styles from './MyPageProfile.module.css'
import axios from 'axios'
// import { useSelector } from 'react-redux'
import { useSelector, useDispatch } from "react-redux";    
import { uploadImage } from '../../store/etc';


const MyPageProfile = () => {
    const dispatch = useDispatch()
    const {email, name, role, image} = useSelector((state) => state.auth)
    const [profileImage,setProfileImage] = useState(image)
    // const {name, email, role, s3Url} = useSelector((state) => state.etc)
    const [showModal, setShowModal] = useState(false);
    const [uploadPicture, setUploadPicture] = useState(null);
    console.log(email,name, role, image)
    const handlePictureUpload=async (e)=>{
        const formData =await new FormData();
        formData.append('email', email)
        formData.append('file', uploadPicture)
        // 업로드한 사진을 URL로 만들어서 성공하면 그 URL을 소스에. (window.URL.createObjectURL)
        dispatch(uploadImage(role, formData)).then((res) => {setProfileImage(window.URL.createObjectURL(uploadPicture));setShowModal(false);})
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
                <img className={styles.picture} src={profileImage?profileImage:'/profile_base.png'} alt='/profile_base.png'></img>
                <img className={styles.camera} src='/camera.png' alt='camera' onClick={() => setShowModal(!showModal)}></img>
            </div>
            <div className={styles.name}>{name} <span className={styles.name2}>{role}</span></div>

        </div>
    );
}


export default MyPageProfile