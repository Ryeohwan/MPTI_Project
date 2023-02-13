// 라이브러리
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
// CSS
import styles from './Header.module.css'
import Chat from '../Chat/Chat'
import logo from '../../assets/img/pxArt.png'
import { Navigate } from 'react-router-dom';
//ClientHeader
export default function ClientHeader(){
	const [roleToken, setRoleToken]=useState(
		localStorage.getItem("mpti_role")
	);
	// 채팅 온
	const [chaton, setChatOn] = useState(false);
	// 선택한 메뉴
	const [menuselect, setMenuSelect] = useState(null);
	// 메시지 개수
	const [messagecount, setMessageCount] = useState(99);
	//채팅 끄기
	function turnoffchat() {
		setChatOn(false)
	}
	useEffect(() =>{
		const LINK_LIST=['/home','/clientmyschedule','/clientmylog', '/clientmyreservation','/clientmypage']
		LINK_LIST.forEach((link) => {
			if(window.location.pathname.startsWith(link)){
				setMenuSelect(link.slice(1));
				return 0;
			};
		})
	} , [])



	if(roleToken!=="client" ){
		Navigate({to:"/"})
	}





  	return(
		// nav_box 스타일 지정
		<div className={styles.Header}>
			<Chat chaton={chaton} turnoffchat={turnoffchat}/>
			{/* home 이동버튼 */}
			<div className={styles.head_logo}> <Link to={'home'} onClick={()=>{setMenuSelect('home')}}>
			MPTI</Link>	</div>
			

			{/* head menu담는 박스 */}
			<div className = {styles.head_menu}>
				{/* 내 스케줄 클릭시 /clientmyschedule로 라우팅 */}
				<div className={styles.head_text}><Link id='clientmyschedule' to={'myschedule'} style={menuselect === 'clientmyschedule'?{color:"#C9FD61"}:null} onClick={()=>{setMenuSelect('clientmyschedule')}}>
					내 스케줄</Link></div>
				{/* 내 운동기록 클릭시 /clientptlog 라우팅 */}
				<div className={styles.head_text}><Link id='clientmylog' to={'mylog'}  style={menuselect === 'clientmylog'?{color:"#C9FD61"}:null} onClick={()=>{setMenuSelect('clientmylog')}}>
					운동기록</Link></div>
				{/* 내 예약하기 클릭시 /clientreservation 라우팅 */}
				<div className={styles.head_text}><Link id='clientmyreservation' to={'myreservation'} style={menuselect === 'clientmyreservation'?{color:"#C9FD61"}:null} onClick={()=>{setMenuSelect('clientmyreservation')}}>
					예약하기</Link></div>

				{/* 메일 + 프로필 담는 박스 */}
				<div className={styles.mail_profile_box}>
					{/* 메시지 */}
					<div className={styles.mail_box} onClick={()=>{setChatOn(true)}}>
						{/* 메시지 개수 */}
						<div className={styles.mail_count_box}> {messagecount}+ </div>
						{/* 메시지 이미지 */}
						<img className={styles.mail_img} alt="chatmail" src='/chatmail.png'></img>
					</div>
					{/* 가장 오른쪽 프로필 그림 클릭시 /clientmypage 라우팅 */}
					<Link to={'mypage'} onClick={()=>{setMenuSelect('clientmypage')}}>
						<img className={styles.profile_img} alt="profilepic" src='/profilepic.png'></img>
					</Link>
				</div>
			</div>
		</div>
  )
}
