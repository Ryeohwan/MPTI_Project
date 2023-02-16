import styles from "./Landing.module.css";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const LandingGuide = () => {
  const { role, isLoggedIn } = useSelector((state) => state.auth);
  const [roleToken, setRoleToken] = useState(localStorage.getItem("mpti_role"));

  const [clientShow, setClientShow] = useState(true);
  const [trainerShow, setTrainerShow] = useState(false);
  const [adminShow, setAdminShow] = useState(false);

  const clientHandleClick = () => {
    console.log("1");
    setClientShow(true);
    setTrainerShow(false);
    setAdminShow(false);
  };

  const trainerHandleClick = () => {
    console.log("2");
    setClientShow(false);
    setTrainerShow(true);
    setAdminShow(false);
  };

  const adminHandleClick = () => {
    console.log("3");
    setClientShow(false);
    setTrainerShow(false);
    setAdminShow(true);
  };

  return (
    <nav className={styles.landing_guide}>
      <div className={styles.landing_box}>
        <img src="/MPTIlogo.png" className={styles.landing_img} />
        <div className={styles.landing_title}>의 사용법은 다음과 같습니다.</div>
      </div>
      <div className={styles.nav_box}>
        <div onClick={() => clientHandleClick()}>관리자</div>
        <div onClick={() => trainerHandleClick()}>고객</div>
        <div onClick={() => adminHandleClick()}>트레이너</div>
      </div>
      {clientShow && (
        <div className={styles.infobox}>
          <div className={styles.landing_info} style={{fontSize:"26px" , marginBottom:"10px"}}> 회원</div>
          <div className={styles.landing_info}>
            - 자체 회원가입 혹은 소셜로그인을 (구글, 네이버, 카카오) 통해
            회원가입을 하고 로그인 합니다.{" "}
          </div>
          <div className={styles.landing_info}>
            - 본인의 일정과 성향에 맞는 트레이너들을  <span style={{color:"#c9fd61"}}>"예약하기"</span> 페이지에서
            찾을수 있습니다.{" "}
          </div>
          <div className={styles.landing_info}>
            - 트레이너의 이름 혹은 설정해둔 유효 날짜검색을 통해 필터링된
            트레이너 목록을 확인할수있습니다.
          </div>
          <div className={styles.landing_info}>
            -  <span style={{color:"#c9fd61"}}>"내 스케줄"</span> 페이지에서 본인이 예약해둔 PT예약 리스트들을
            일정순으로 확인하고 화상수업에 입장할 수 있습니다.
          </div>
          <div className={styles.landing_info}>
            - <span style={{color:"#c9fd61"}}>"운동기록"</span> 페이지에서 본인의 누적 운동부위와 기록을 통한 운동추천
            및 BMI수치를 측정할수있는 서비스를 제공합니다.
          </div>
          <div className={styles.landing_info}>
            - <span style={{color:"#c9fd61"}}>"마이페이지"</span> 본인의 프로필 이미지 혹은 개인정보를 수정하고
            일정들을 확인 할 수 있습니다.
          </div>
        </div>
      )}

      {trainerShow && (
        <div className={styles.infobox}>
          <div className={styles.landing_info} style={{fontSize:"26px" , marginBottom:"10px"}}> 트레이너</div>
          <div className={styles.landing_info}>
            - 트레이너 회원가입을 통해 본인의 개인정보와 이력을 작성하고
            관리자의 가입승인 여부에 따라 서비스를 이용할수있습니다.
          </div>
          <div className={styles.landing_info}>
            - <span style={{color:"#c9fd61"}}>"예약관리"</span> 페이지를 통해 오늘 수업목록을 확인하고 시간에 맞춰
            입장할수있으며 달력을 통해 각 기간별 수업일정을 손쉽게
            확인할수있습니다.{" "}
          </div>
          <div className={styles.landing_info}>
            - <span style={{color:"#c9fd61"}}>"고객관리"</span>  페이지에서 본인의 수업을 신청한 고객들의 개인정보
            그리고 이전에 기록된 운동정보와 특이사항을 손쉽게 확인 할
            수있습니다.{" "}
          </div>
          <div className={styles.landing_info}>
            - <span style={{color:"#c9fd61"}}>"마이페이지"</span>  본인의 프로필 이미지 혹은 개인정보를 수정하고 본인
            수업의 리뷰들을 확인할수 있습니다.
          </div>
          <div className={styles.landing_info}>
            - <span style={{color:"#c9fd61"}}>"마이페이지"</span>본인의 기간별 수업가능시간(고객예약가능시간)을 간단한
            클릭을 통해 설정할수있습니다.
          </div>
        </div>
      )}

      {adminShow && (
        <div className={styles.infobox}>
          <div className={styles.landing_info} style={{fontSize:"26px" , marginBottom:"10px"}}> 관리자</div>
          <div className={styles.landing_info}>
            - <span style={{color:"#c9fd61"}}>"가입승인"</span> 페이지에서 대기중인 트레이너 가입신청목록을
            확인할수있고 정보를 확인한후에 가입 승인/반려 여부를
            선택할수있습니다.
          </div>
          <div className={styles.landing_info}>
            - <span style={{color:"#c9fd61"}}>"신고관리"</span> 페이지에서 고객과 트레이너에게서 들어온 신고사항을
            확인하고 판단후에 정지일자를 선택하여 유저에게 제재를
            부여할수있습니다.
          </div>
          <div className={styles.landing_info}>
            - <span style={{color:"#c9fd61"}}>"계정관리"</span> 페이지에서 고객과 트레이너들의 목록을 확인할수있고,
            계정들을 삭제 할 수 있습니다.
          </div>

          <div className={styles.landing_info}>
            - 관리자 계정은 회원가입과 같은 일반적인 과정으로 생성 할 수 없습니다.
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingGuide;
