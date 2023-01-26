//유저 네비게이션 바(컴포넌트)
import React from 'react'
import { ReactDOM } from 'react'
import ClientNavBar from './components/ClientNavBar/ClientNavBar'
import TrainerNavBar from './components/TrainerNavBar/TrainerNavBar'
// import SignUP from './components/YDG_DEVELOPING/SignUp'
// import NaverLogin from './components/YDG_DEVELOPING/test'

// css module
import styles from './App.module.css'


/*-----------------------------------코드 시작 부분-----------------------------------*/

// {/* 스타일 : 바탕화면 background 그라데이션 색깔 입히기. height=100% */}
export default function App(){
  return (
      <div className={styles.background}>
        <ClientNavBar/>
        <TrainerNavBar/>
      </div>
  )
}

// {/* ClientNavbar 는 client의 네비게이션 바/ TrainerNavBar는 Trainer의 네비게이션 바 */}
// {/* <NaverLogin></NaverLogin>
// <SignUP/> */}