// 라이브러리
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
// CSS
import styles from './Header.module.css'
import Chat from '../Chat/Chat'
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { chatToggle, etcActions } from '../../store/etc'
import { authActions } from '../../store/auth'
import logo from '../../assets/img/MPTIlogo.png'
//ClientHeader
export default function ClientHeader(){
	const dispatch = useDispatch();
	const {roleToken} = useSelector((state) => state.auth)
	const navigate= useNavigate();
	const {image} = useSelector(state=>state.auth)
	// 채팅 온
	const {chatOn} = useSelector(state=>state.etc)

	// const setChatOn = () => console.log(1)
	// 선택한 메뉴
	const [menuselect, setMenuSelect] = useState(null);
	// 메시지 개수
	const [messagecount, setMessageCount] = useState(99);
	//채팅 끄기

	const [view, setView] = useState(false);

	useEffect(() =>{
		const LINK_LIST=['/home','/clientmyschedule','/clientmylog', '/clientmyreservation','/clientmypage']
		LINK_LIST.forEach((link) => {
			if(window.location.pathname.startsWith(link)){
				setMenuSelect(link.slice(1));
				return 0;
			};
		})
	} , [])



	if(roleToken!=="user" ){
		Navigate({to:"/"})
	}

	const logout = () => {
		dispatch(authActions.logout())
		sessionStorage.clear()
		localStorage.clear()
		navigate("/login")
		console.log('로그아웃')
	}



  	return(
		// nav_box 스타일 지정
		<div className={styles.Header}>
			{ chatOn && <Chat />}
			{/* home 이동버튼 */}
			<div className={styles.head_logo}> <Link to={'home'} onClick={()=>{setMenuSelect('home')}}>
			<img src={logo} style={{width: "200px", height: "70px",marginTop:-8.5}}/></Link></div>
			

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
					<div className={styles.mail_box} onClick={()=>{dispatch(etcActions.chatToggle())}}>
						{/* 메시지 개수
						<div className={styles.mail_count_box}> {messagecount}+ </div> */}
						{/* 메시지 이미지 */}
						<img className={styles.mail_img} alt="chatmail" src='/chatmail.png'></img>
					</div>
					{/* 가장 오른쪽 프로필 그림 클릭시 /clientmypage 라우팅 */}
					<div className={styles.mypage_box}>
						<img className={styles.profile_img} alt="/profile_base.png" src={image?`${image}?${Math.random()}`:'/profile_base.png'} onClick={() => setView((prev)=>!prev)}></img>
						{
							view &&
							<div className={styles.dropdown}>
								<div className={styles.dropdown_content}><Link to={'mypage'} onClick={()=>{setMenuSelect('clientmypage'); setView(false);}}>마이페이지</Link></div>
								<div className={styles.dropdown_content} onClick={()=>{logout()}}>로그아웃</div>
							</div>
						}
					</div>	
				</div>
			</div>
		</div>
  )
}
