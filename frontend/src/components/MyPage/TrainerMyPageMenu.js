import styles from './TrainerMyPageMenu.module.css'
import {Link} from 'react-router-dom';
export default function TrainerMyPageMenu(props) {
    console.log(props)
    return(
        <div className={styles.menu_box}>
            <div className={styles.menu_title}>메뉴</div>
            <Link onClick={() => props.setUrl('myinfo')} id='myinfo' className={styles.menu_item} to={'./myinfo'}>내 개인 정보</Link>
            <Link onClick={() => props.setUrl('myreview')} id='myreview' className={styles.menu_item} to={'./myreview'}>내 수업 리뷰</Link>
            <Link onClick={() => props.setUrl('myschedule')} id='myschedule' className={styles.menu_item} to={'./myschedule'}>스케줄 조정</Link>
        </div>
    )
}