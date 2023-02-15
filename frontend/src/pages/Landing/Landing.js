import styles from './Landing.module.css'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const Landing = () => {
const { role, isLoggedIn} = useSelector((state) => state.auth);
const [roleToken, setRoleToken] = useState(
    localStorage.getItem("mpti_role")
);



    return(
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.section_content}>
                    <div className={styles.typingwrapper}>

                    <h1 className={styles.typing}>
                        M&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        P&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        T&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        I</h1>
                    </div>
                    <h3 className={`${styles.loader} ${styles.typingwrapper} ${styles.typing2}`}>
                        <span>M</span>
                        <span>a</span>
                        <span>r</span>
                        <span>k</span>
                        <span>e</span>
                        <span>t</span>
                        <span> &nbsp;</span>
                        <span>b</span>
                        <span>y</span>
                        <span>&nbsp;</span>
                        <span>P</span>
                        <span>e</span>
                        <span>r</span>
                        <span>s</span>
                        <span>o</span>
                        <span>n</span>
                        <span>a</span>
                        <span>l</span>
                        <span>&nbsp;</span>
                        <span>T</span>
                        <span>r</span>
                        <span>a</span>
                        <span>i</span>
                        <span>n</span>
                        <span>e</span>
                        <span>r</span>
                        <span>&nbsp;</span>
                        <span>&</span>
                        <span>&nbsp;</span>
                        <span>I</span>
                    </h3>
                    
                    <Link to="/login"><button className={styles.blink2}>시작하기</button></Link>
                   
                </div>

                </div>
                <div className={styles.menu_section}>
                <ul>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
        </div>
    )

}



export default Landing