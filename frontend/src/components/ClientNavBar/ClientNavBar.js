
// 필요한 모듈or라이브러리 가져오기
import { Link } from 'react-router-dom'
import { useState } from 'react'
// ClientNAvbar css 모듈 가져오기
import styles from './ClientNavBar.module.css'
// 채팅 컴포넌트 가져오기
import Chat from '../Chat/Chat';

// 유저NavBar 리턴 함수
export default function ClientNavuser(){
	const [menuselect, setMenuSelect] = useState(null);
	console.log(menuselect)
  	return(
		// nav_box 스타일 지정
		<div className={styles.nav_box}>
			<Chat></Chat>
			{/* 로고 클릭시 /home 으로 이동하는 라우팅 */}
			<div className={styles.logo_box}>
				<Link to={'/home'} onClick={()=>{setMenuSelect('home')}}>
					<div className={styles.logo_box}>
						<span className={styles.logo_text} style={menuselect === 'home'?{color:"#C9FD61"}:null}>MPTI</span>
					</div>
					{/* <img alt='MPTIlogo' src='/MPTIlogo.png'></img> */}
				</Link>
				</div>
			
			{/* ClientNavbar 메뉴담는 오른쪽 박스. 폰트 지정 */}
			<div className = {`${styles.whitefont} ${styles.nav_menubox}`}>
				<div>

					{/* 내 스케줄 클릭시 /clientmyschedule로 라우팅 */}
					<Link to={'/clientmyschedule'} style={menuselect === 'clientmyschedule'?{color:"#C9FD61"}:null} onClick={()=>{setMenuSelect('clientmyschedule')}}>내 스케줄</Link>
					</div>
				<div>
					{/* 내 운동기록 클릭시 /clientptlog 라우팅 */}
					<Link to={'/clientptlog'}  style={menuselect === 'clientptlog'?{color:"#C9FD61"}:null} onClick={()=>{setMenuSelect('clientptlog')}}>운동기록</Link>
					</div>
				<div>
					{/* 내 예약하기 클릭시 /clientreservation 라우팅 */}
					<Link to={'/clientreservation'} style={menuselect === 'clientreservation'?{color:"#C9FD61"}:null} onClick={()=>{setMenuSelect('clientreservation')}}>예약하기</Link>
					</div>
				<div>
					{/* 메일 모양 + 프로필 담는 박스 */}
					<div className={styles.mail_profile_box}>
						{/* 매일 담는 박스 */}
						<div className={styles.mail_box} onClick={()=>{document.getElementById('chat').style.display='flex'; document.getElementById('mail').style.filter='invert(100%) sepia(32%) saturate(4032%) hue-rotate(32deg) brightness(125%) contrast(103%)';}}>
							{/* 메시지 개수 출력 임시로 99+ 지정 */}
							<div className={styles.mail_count_box}>
										<span>99+</span>
								</div>
							{/* 메시지 이미지 */}
							<img id='mail' className={styles.mail_img} alt="chatmail" src='/chatmail.png'>

								</img>
							</div>


							{/* 가장 오른쪽 프로필 그림 클릭시 /clientmypage 라우팅 */}
						<Link to={'/clientmypage'} onClick={()=>{setMenuSelect('clientmypage')}}>
							<img className={styles.profile_box} style={menuselect === 'clientmypage'?{borderColor:"#C9FD61"}:{borderColor:"#ececec"}} alt="profilepic" src='/profilepic.png'></img>
							</Link>
						
						</div>
					</div>
			</div>
		</div>
  )
}