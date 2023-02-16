import styles from './ClientMyPageMyInfo.module.css'
import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { clientEditInfo } from '../../../store/etc';

const ClientMyPageMyInfo = ({myInfo, setMyInfo}) => {
    const dispatch = useDispatch();
    const info_list=['이름', '성별', '생년월일', '이메일', '핸드폰'];
    const [edit, setEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);

    console.log(myInfo)
    async function infoEdit(e){
        e.preventDefault();
        if(myInfo){
            const email = myInfo.email;
            const phone = document.getElementById('phone');
            const password = document.getElementById('password');
            
            dispatch(clientEditInfo(email, password.value, phone.value)).then((data) => {
                if(data){
                    setMyInfo((prev) => ({...prev, phone:phone.value}));
                    setShowModal(false);
                    setEdit(false);
            }})} 
    }
    function editCheck(){
        if(myInfo && document.getElementById('phone').value === myInfo.phone){
            setEdit(false)
        } else {
            setShowModal(true)
        }
    }
    return(
        <div className={styles.container}> 
            {showModal && (
                <div className={styles.modal}>
                     <div className={styles.modal} onClick={() => setShowModal(false)}>
                    </div>
                    <div className={styles.modal_content}>
                        <div>비밀번호</div>
                        <form onSubmit={(e) => {infoEdit(e)}}>
                            <input id='password' type="password" autoFocus={true}></input>
                            <button className={styles.send_btn} type='submit'>확인</button>
                        </form>
                    </div>
                </div>
               
            )}
            {edit?
            <form className={styles.out_box} onSubmit={(e) => {e.preventDefault()}}>
                <div className={styles.in_box}>
                    <div className={styles.in_box_title}>✔ 인적사항</div>
                    {Object.values(myInfo).map((value, index)=>
                    <div className={styles.in_box_content} key={index}>
                        <div className={styles.left}>{info_list[index]}</div>{index<4?
                        <div className={styles.right}>{value}</div>
                        :
                        <input type='text' id='phone' defaultValue={value} className={`${styles.right} ${styles.input_box}`}></input>}
                    </div>)}
                </div>
                <div className={styles.edit_btn_box}><button className={styles.edit_btn} onClick={() => setEdit(false)}>취소</button><button className={styles.edit_btn} onClick={() => editCheck()}>완료</button></div>
                
            </form>
                // edit 상태면 위의 양식을 출력 
            :
                // edit 상태가 아니면 아래 양식을 출력
            <div className={styles.out_box}>
                <div className={styles.in_box}>
                    <div className={styles.in_box_title}>✔ 인적사항</div>
                    {myInfo?Object.values(myInfo).map((value, index)=>
                    <div className={styles.in_box_content} key={index}>
                        <div className={styles.left}>{info_list[index]}</div> <div className={styles.right} value={value}>{value}</div>
                    </div>):null}
                </div>
                <div className={styles.edit} onClick={()=>{setEdit(true);}}>수정<img className={styles.edit_img} src='/edit.png' alt='edit.png'></img></div>
            </div>
            } 
        </div>
    );
}


export default ClientMyPageMyInfo