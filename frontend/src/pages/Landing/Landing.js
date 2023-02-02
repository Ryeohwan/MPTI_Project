import styles from './Landing.module.css'
import {Link} from 'react-router-dom'

const Landing = () => {

    return(
        <div className={styles.container}>
            <div className={styles.section}>
                <div className={styles.section_content}>
                    <h1>M arket by</h1>
                    <h1>P ersonal</h1>
                    <h1>T rainer</h1>
                    <h1>& I</h1>
                    <div className={styles.circle}></div>
                    <Link to="/select"><button>시작하기</button></Link>
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