import React from "react";
import { useNavigate } from "react-router-dom";
import TopTitle from "../../components/Common/TopTitle";
import styles from "./ClientTrainerDetail.module.css";
import TrainerImg from "./../../assets/img/trainer.PNG";

const ClientTrainerDetail = () => {
  // 채팅 페이지(모달?)로 이동
  // const onClickTalk = () => {

  // }
  const navigate = useNavigate();
  const navigateToPayment = () => {
    navigate("/clientpayment");
  };
  const data_got = {
    name: "윤뒝근",
    email: "asfdd@naver.com",
    phone: "010-1234-5678",
    cert: ["생활스포츠지도사", "건강운동관리사", "NSCA"],
    gender: "남",
    age: 28,
    prize: ["서울특별시장배 보디빌딩대회", "나바(NABBA) 대회", "WBC대회"],
    career: [
      { name: "저스트짐 역삼점", time: "2019.01~2020.03" },
      { name: "저스트쥠", time: "2021.03~2022.04" },
    ],
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
              src={TrainerImg}
              alt=""
              className={styles.trainer_detail_img}
            />
          </div>

          <div className={styles.trainer_name}>{data_got.name} 트레이너</div>

          <div className={styles.trainer_gender_age}>
            {data_got.gender}, {data_got.age}세
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
            {data_got.prize.map((item) => (
              <div key={item} className={styles.trainer_prize_content}>
                {item}
              </div>
            ))}
          </div>

          <div className={styles.trainer_certificate_title}>자격증</div>
          <div className={styles.trainer_certificate_content_box}>
            {data_got.cert.map((item) => (
              <div key={item} className={styles.trainer_certificate_content}>
                {item}
              </div>
            ))}
          </div>

          <div className={styles.trainer_career_title}>경력</div>
          <div className={styles.trainer_career_content_box}>
            {data_got.career.map((item) => (
              <div key={item} className={styles.trainer_career_content}>
                {item.name} {item.time}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ClientTrainerDetail;
