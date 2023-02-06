import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ManagerNavigation.module.css'
const ManagerNavigation = () => {

    const [choice, setChoice] = useState("sign");


    return (
        <div className={styles.info_nav_box}>
                    
        <div className={styles.nav_title}>메뉴</div>
        <ul className={styles.nav_item}>
        <Link  to={"./"}> <li onClick={()=> setChoice("sign")} className={styles.nav_sign}><span style={choice==="sign"? {visibility:"visible"}:null} className={styles.select_square1} >&#9654;</span>가입승인</li></Link>
        <Link  to={"./report"}>  <li onClick={()=>setChoice("report")} className={styles.nav_report}><span style={choice==="report"? {visibility:"visible"}:null} className={styles.select_square2} >&#9654;</span>신고관리</li></Link>
        <Link  to={"./account"}>  <li onClick={()=> setChoice("account")}className={styles.nav_account}><span style={choice==="account"? {visibility:"visible"}:null} className={styles.select_square3} >&#9654;</span>계정관리</li></Link>
        </ul>
    </div>
    );
};

export default ManagerNavigation;