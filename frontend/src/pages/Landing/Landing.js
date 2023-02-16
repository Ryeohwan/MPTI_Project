import styles from './Landing.module.css'
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import LandingGoal from './LandingGoal';
import LandingGuide from './LandingGuide';
import LandingHome from './LandingHome';

const Landing = () => {
const { role, isLoggedIn} = useSelector((state) => state.auth);
const [roleToken, setRoleToken] = useState(
    localStorage.getItem("mpti_role")
);
const navigate= useNavigate();



    return(
        <div className={styles.container}>
          <header className={styles.header}> 
            <div className={styles.header_box}>
                <div className={styles.header_menu}><Link  to={"/"}>HOME</Link></div>
                <div className={styles.header_menu}><Link  to={"/goal"}>GOAL</Link></div>
                <div className={styles.header_menu}><Link  to={"/guide"}>GUIDE</Link></div>
                <div className={styles.header_menu}  onClick={()=>{navigate("/login")}}>LOGIN</div>
            </div>
          </header>
         
        <Routes>
            <Route path="/" element={<LandingHome/>}/>
            <Route path="/goal" element={<LandingGoal/>}/>
            <Route path="/guide" element={<LandingGuide/>}/>
        </Routes>
        </div>
    )

}



export default Landing