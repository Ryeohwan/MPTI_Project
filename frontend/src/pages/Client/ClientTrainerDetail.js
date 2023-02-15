import React from "react";
import styles from "./ClientTrainerDetail.module.css";
import { useLocation, Link } from "react-router-dom";
import TopTitle from "../../components/Common/TopTitle";
import { useDispatch, useSelector } from "react-redux";
import { etcActions, getChatRoom, trainerDetail } from "../../store/etc";

const ClientTrainerDetail = () => {
  const {id, role} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation();
  console.log(location.state)
  // 클릭한 트레이너 정보들 보기쉽게 정리 (아래에)
  const name= location.state.name;
  const gender = location.state.gender;
  const age = new Date().getFullYear()-parseInt(location.state.birthday.slice(0,4))+1
  const awards = JSON.parse(location.state.awards)
  const license = JSON.parse(location.state.license)
  const career = JSON.parse(location.state.career)
  const s3Url = location.state.s3Url
  const email = location.state.email

  // 채팅방 Id 가져오기 
  const goChat = async () => {
    const [targetId,targetName] = await dispatch(trainerDetail(email)).then((res)=>[res.id,res.name])
    const roomId = await dispatch(getChatRoom(id,role,name,targetId,targetName))
    dispatch(etcActions.chatToggle())
    dispatch(etcActions.chatEnter({type:'enter', payload:roomId}))
    dispatch(etcActions.chatTarget(targetName))
    return roomId
  }

  return (
    <div>
      <TopTitle
        title="트레이너 상세정보▼"
        content="트레이너와 상담 혹은 예약을 진행해보세요!"
      />

      <div className={styles.body}>
        <div className={styles.trainer_profile_box}>
          <div className={styles.trainer_img_wrapper}>
            <img
              src={s3Url?s3Url:'/profile_base.png'}
              alt="profile_base.png"
              className={styles.trainer_detail_img}
            />
          </div>

          <div className={styles.trainer_name}>{name} 트레이너</div>

          <div className={styles.trainer_gender_age}>
            {gender}, {age}세
          </div>
          {role==='user' && <div className={styles.trainer_detail_btn_wrapper}>
             <button 
              className={styles.trainer_talk_btn}
              onClick={() => goChat()}
            >
              상담하기
            </button>
            <Link to={"/user/trainerdetail/realreservation"} state={location.state}>
              <button
                className={styles.trainer_reservation_btn}
              >
                예약하기
              </button>
            </Link>
          </div>}
        </div>

        <div className={styles.trainer_info_box}>
          <div className={styles.trainer_prize_title}>수상</div>
          <div className={styles.trainer_prize_content_box}>
            {awards.map((item) => (
              <div key={item} className={styles.trainer_prize_content}>
                {item}
              </div>
            ))}
          </div>

          <div className={styles.trainer_certificate_title}>자격증</div>
          <div className={styles.trainer_certificate_content_box}>
            {license.map((item) => (
              <div key={item} className={styles.trainer_certificate_content}>
                {item}
              </div>
            ))}
          </div>

          <div className={styles.trainer_career_title}>경력</div>
          <div className={styles.trainer_career_content_box}>
            {career.map((item) => (
              <div key={item} className={styles.trainer_career_content}>
                {item}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
} 

export default ClientTrainerDetail;