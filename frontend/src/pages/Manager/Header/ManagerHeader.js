import React from 'react';
import styles from './ManagerHeader.module.css';
import { useDispatch } from 'react-redux';
import { authActions, logout } from '../../../store/auth';
import { useNavigate } from 'react-router-dom';
const ManagerHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler= ()=>{
        dispatch(authActions.logout())
		sessionStorage.clear()
		localStorage.clear()
		navigate("/login")
		console.log('로그아웃')
    }

    return (
        <div className={styles.header_box}>
        <div className={styles.logo}>MPTI</div>
        <div  className={styles.statebar}>
            <div className={styles.statebar_comment}>Management Warehouse</div>
            <div className={styles.statebar_logout} onClick={logoutHandler}>LOGOUT</div>
        </div>
    </div>
    );
};

export default ManagerHeader;