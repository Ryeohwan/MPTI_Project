import styles from './Landing.module.css'
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const LandingHome = () => {
const { role, isLoggedIn} = useSelector((state) => state.auth);
const [roleToken, setRoleToken] = useState(
    localStorage.getItem("mpti_role")
);
const navigate= useNavigate();



    return(
            <nav className={styles.landing_logo}>
            <div className={styles.logo} >M P T I</div>
            <div className={styles.subtitle}>Market for Personal Trainer & I</div>
            <div className={styles.navigate}>    
                <div className={styles.navigate_btn} onClick={()=>{navigate("/login")}}>
                    START
                </div>
            </div>
            </nav>
    )

}



export default LandingHome;