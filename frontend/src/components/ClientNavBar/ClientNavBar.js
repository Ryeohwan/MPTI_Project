
// 필요한 모듈or라이브러리 가져오기
import { Link } from 'react-router-dom'
// ClientNAvbar css 모듈 가져오기
import styles from './ClientNavBar.module.css'

// 유저NavBar 리턴 함수
export default function ClientNavuser(){

  return(
	// nav_box 스타일 지정
    <div className={styles.nav_box}>

		{/* 로고 클릭시 /home 으로 이동하는 라우팅 */}
      	<div>
			<Link to={'/home'}>
        		<img alt='MPTIlogo' src='/MPTIlogo.png'></img>
			</Link>
        	</div>
		
		{/* ClientNavbar 메뉴담는 오른쪽 박스. 폰트 지정 */}
      	<div className = {`${styles.whitefont} ${styles.nav_menubox}`}>
        	<div>

				{/* 내 스케줄 클릭시 /clientmyschedule로 라우팅 */}
				<Link to={'/clientmyschedule'}>내 스케줄</Link>
          		</div>
        	<div>
				{/* 내 운동기록 클릭시 /clientptlog 라우팅 */}
				<Link to={'/clientptlog'}>운동기록</Link>
          		</div>
        	<div>
				{/* 내 예약하기 클릭시 /clientreservation 라우팅 */}
				<Link to={'/clientreservation'}>예약하기</Link>
          		</div>
        	<div>
				{/* 메일 모양 + 프로필 담는 박스 */}
				<div className={styles.mail_profile_box}>
					{/* 매일 담는 박스 */}
					<div className={styles.mail_box}>
						{/* 메시지 개수 출력 임시로 99+ 지정 */}
						<div className={styles.mail_count_box}>
									<span>99+</span>
							</div>
						{/* 메시지 이미지 */}
						<img alt="chatmail" src='/chatmail.png'>

							</img>
						</div>


						{/* 가장 오른쪽 프로필 그림 클릭시 /clientmypage 라우팅 */}
					<Link to={'/clientmypage'}>
						<img className={styles.profile_box} alt="profilepic" src='/profilepic.png'></img>
						</Link>
					
					</div>
          		</div>
        </div>
    </div>
  )
}