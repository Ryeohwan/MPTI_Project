import styles from './TrainerMyPageMenu.module.css'
import {Link} from 'react-router-dom';
export default function TrainerMyPageMenu(props) {
    return(
        <div className={styles.menu_box}>
            <div className={styles.menu_title}>메뉴</div>
            <Link onClick={() => {props.setUrl('myinfo')}} id='myinfo' className={styles.menu_item} style={props.url==='myinfo'?{color :'#C9FD61'}:null} to={'./myinfo'}><div className={styles.select} style={props.url==='myinfo'?null:{display:'none'}}>▶</div>내 개인 정보</Link>
            <Link onClick={() => {props.setUrl('myreview')}} id='myreview' className={styles.menu_item} style={props.url==='myreview'?{color :'#C9FD61'}:null} to={'./myreview'}><div className={styles.select} style={props.url==='myreview'?null:{display:'none'}}>▶</div>내 수업 리뷰</Link>
            <Link onClick={() => {props.setUrl('myschedule')}} id='myschedule' className={styles.menu_item} style={props.url==='myschedule'?{color :'#C9FD61'}:null} to={'./myschedule'}><div className={styles.select} style={props.url==='myschedule'?null:{display:'none'}}>▶</div>스케줄 조정</Link>
        </div>
    )
}