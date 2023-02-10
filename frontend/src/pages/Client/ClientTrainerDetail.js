import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TopTitle from "../../components/Common/TopTitle";
import styles from "./ClientTrainerDetail.module.css";
import TrainerImg from "./../../assets/img/trainer.PNG";

const ClientTrainerDetail = () => {
  const location = useLocation();
  const name= location.state.name;
  const gender = location.state.gender;
  const age = new Date().getFullYear()-parseInt(location.state.birthday.slice(0,4))+1
  const awards = JSON.parse(location.state.awards)
  const license = JSON.parse(location.state.license)
  const career = JSON.parse(location.state.career)
  const s3Url = location.state.s3Url
  // 채팅 페이지(모달?)로 이동
  // const onClickTalk = () => {

  // }
  const navigate = useNavigate();
  const navigateToPayment = () => {
    navigate("clientpayment");
  };

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
          <div className={styles.trainer_detail_btn_wrapper}>
            <button className={styles.trainer_talk_btn}>상담하기</button>
            <button
              className={styles.trainer_reservation_btn}
              onClick={navigateToPayment}
            >
              예약하기
            </button>
          </div>
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
};

export default ClientTrainerDetail;
