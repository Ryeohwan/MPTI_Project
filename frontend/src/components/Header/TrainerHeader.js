// 라이브러리
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// CSS
import styles from './Header.module.css'

// 트레이너NavBar 리턴 함수
export default function TrainerHeader(){
	// 선택한 메뉴
	const [menuselect, setMenuSelect] = useState(null);
	// 메시지 개수
	const [messagecount, setMessageCount] = useState(99);
	useEffect(() =>{
		const LINK_LIST=['/home','/clientmyschedule','/clientmylog', '/clientmyreservation','/clientmypage']
		LINK_LIST.forEach((link) => {
			if(window.location.pathname.startsWith(link)){
				setMenuSelect(link.slice(1));
				return 0;
			};
		})
	} , [])


	return(
		// nav_box 스타일 지정
		<div className={styles.Header}>

			{/* home 이동버튼 */}
			<div className={styles.head_logo}>
				<Link to={'/home'} style={menuselect === 'home'?{color:"#C9FD61"}:null} onClick={()=>{setMenuSelect('home')}}>
						MPTI</Link>	
			</div>
			
			{/* head menu담는 박스 */}
			<div className = {styles.head_menu}>
					{/* 예약현황 클릭시 /trainermyreservation로 라우팅 */}
					<div><Link id='trainermyreservation' className={styles.head_text} to={'/trainermyreservation'} style={menuselect === 'trainermyreservation'?{color:"#C9FD61"}:null} onClick={()=>{setMenuSelect('trainermyreservation')}}>
						예약현황</Link></div>
					{/* 고객관리 클릭시 /trainermyclient 라우팅 */}
					<div><Link id='trainermyclient'className={styles.head_text} to={'/trainermyclient'}  style={menuselect === 'trainermyclient'?{color:"#C9FD61"}:null} onClick={()=>{setMenuSelect('trainermyclient')}}>
						고객관리</Link></div>

					{/* 메일 + 프로필 담는 박스 */}
					<div className={styles.mail_profile_box}>
						{/* 메시지 */}
						<div className={styles.mail_box} onClick={()=>{document.getElementById('chat').style.display='flex';}}>
						{/* 메시지 개수 */}
						<div className={styles.mail_count_box}> {messagecount}+ </div>
						{/* 메시지 이미지 */}
						<img className={styles.mail_img} alt="chatmail" src='/chatmail.png'></img>
					</div>
					{/* 가장 오른쪽 프로필 그림 클릭시 /trainermypage 라우팅 */}
					<Link to={'/trainermypage'} onClick={()=>{setMenuSelect('trainermypage')}}>
						<img className={styles.profile_img} alt="profilepic" src='/profilepic.png'></img>
					</Link>
				</div>
			</div>
		</div>
  )
}