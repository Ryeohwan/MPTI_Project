import React, {useState} from 'react'
import styles from './MyPageProfile.module.css'
import { useSelector, useDispatch } from "react-redux";    
import { uploadImage } from '../../store/etc';
import { getMyData } from '../../store/auth';


const MyPageProfile = () => {
    const dispatch = useDispatch()
    const {email, name, role, image} = useSelector(state => state.auth)
    console.log(email, name, role, image)
    const [showModal, setShowModal] = useState(false);
    const [uploadPicture, setUploadPicture] = useState(null);
    const handlePictureUpload=async (e)=>{
        const formData =await new FormData();
        formData.append('email', email)
        formData.append('file', uploadPicture)
        // 업로드한 사진을 URL로 만들어서 성공하면 그 URL을 소스에. (window.URL.createObjectURL)
        // 2. 1번째 방법 아무리 생각해도 이상해서 다른방법 => cash boosting?? 캐쉬부수기 시행.
        // 주의사항 : user랑 trainer auth에서 정보 받을때, user는 image에 s3url, trainer는 iamgeUrl로 들어오니 주의
        await dispatch(uploadImage(role, formData)).then((res) => {setShowModal(false);})
        !image && dispatch(getMyData(role, email)).then((res)=>{alert('업로드 완료')})
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
                <img className={styles.picture} src={image?`${image}?${Math.random()}`:'/profile_base.png'} alt='/profile_base.png'></img>
                <img className={styles.camera} src='/camera.png' alt='camera' onClick={() => setShowModal(!showModal)}></img>
            </div>
            <div className={styles.name}>{name} <span className={styles.name2}>{role==="trainer" ? "트레이너" : "회원"}</span></div>

        </div>
    );
}


export default MyPageProfile