import styles from './Landing.module.css'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const LandingGuide = () => {
    const { role, isLoggedIn } = useSelector((state) => state.auth);
    const [roleToken, setRoleToken] = useState(
        localStorage.getItem("mpti_role")
    );
    const navigate = useNavigate();
    return (
        <nav className={styles.landing_guide}>
                      <div className={styles.landing_box}>  
                    <img src="/MPTIlogo.png" className={styles.landing_img} />
                    <div className={styles.landing_title}>의 사용법은 다음과 같습니다.</div>
                </div>
              
                <div className={styles.landing_info}>- 운동의 중요성을 알리고 고객의 성향에 알맞는 선생님들을 소개해드립니다.</div>
                <div className={styles.landing_info}>- 일반 고객뿐만 아니라 트레이너까지 서로 득이 될 수 있는 서비스를 제공합니다. </div>
                <div className={styles.landing_info}>- </div>
                <div className={styles.landing_info}>- </div>

                <div className={styles.landing_image}><img   src="/back-spinner.gif" alt="" /></div>
        </nav>
    )

}



export default LandingGuide;