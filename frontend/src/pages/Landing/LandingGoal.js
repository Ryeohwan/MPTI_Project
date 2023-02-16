import styles from './Landing.module.css'
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const LandingGoal = () => {
const { role, isLoggedIn} = useSelector((state) => state.auth);
const [roleToken, setRoleToken] = useState(
    localStorage.getItem("mpti_role")
);
const navigate= useNavigate();



    return(
            <nav className={styles.landing_goal}>
                
                <div className={styles.landing_box1}>  
                    <img src="/MPTIlogo.png" className={styles.landing_img} />
                    {/* <div className={styles.landing_title}>는 다음과 같은 목표를 갖고있습니다.</div> */}
                </div>
              
                <div className={styles.landing_direction}>"모든 국민이 건강한 그날까지 달리겠습니다"</div>
                <div className={styles.landing_direction}>"We will continue until all the people are healthy."</div>
                <div className={styles.landing_direction}>"我会一直做到所有国民都健康为止"</div>
                <div className={styles.landing_direction}>"すべての国民が健康になるまで続けます"</div>
                <div className={styles.landing_direction}>"jusqu'à ce que tous les citoyens soient en bonne santé."</div>
                <div className={styles.landing_direction}>"Ich werde so lange weitermachen, bis es allen Menschen gut."</div>
                <div className={styles.landing_direction}>"จะทำต่อไปจนกว่าประชาชนทุกคนจะมีสุขภาพแข็งแรงค่ะ"</div>
             
              
                <div className={styles.landing_image}><img   src="/test.gif" alt="" /></div>
            </nav>
    )

}



export default LandingGoal