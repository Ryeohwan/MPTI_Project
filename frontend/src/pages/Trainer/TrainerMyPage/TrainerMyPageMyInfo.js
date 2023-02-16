import styles from './TrainerMyPageMyInfo.module.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { changeTrainerInfo } from '../../../store/etc';


const TrainerMyPageMyInfo=({myInfo, setMyInfo})=>{
    const dispatch = useDispatch()
    const email = myInfo.email
    const [edit,setEdit] = useState(false);
    const setInfo = async (e) => {
        e.preventDefault()
        if(e.target.phone.value!==myInfo.phone){
            const data = await dispatch(changeTrainerInfo(email,e.target.phone.value))
            setMyInfo(data)
        }
        setEdit(false)
    }

    
    return(
        <div className={styles.container}> 
            <div className={styles.content_title}>내 개인정보</div>
            {
                !myInfo?null:
                edit?
                    <form className={styles.out_box} method='POST' onSubmit={(e) => {setInfo(e);}}>
                        <div className={styles.content_box}>
                            {/* 이메일 */}
                            <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>💌이메일</div> 
                                        <div className={styles.right}>{myInfo.email}</div>
                                    </div>
                                </div>
                            {/* 휴대폰 */}
                            <div className={styles.in_box}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>📞휴대폰</div> 
                                    <input name="phone" defaultValue={myInfo.phone} className={`${styles.right} ${styles.input_box}`}></input>
                                </div>
                            </div>
                            {/* 자격증 */}
                            <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>📜자격증</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(myInfo.license).map((value,index)=> <div key={`${value}-${index}`}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                            {/* 수상 */}
                            <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>🏆수상</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(myInfo.awards).map((value,index)=> <div key={`${value}-${index}`}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                            {/* 경력 */}
                            <div className={styles.in_box}> 
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>👨‍🎓경력</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(myInfo.career).map((value, index)=> <div className={styles.awards_box} key={`${value}-${index}`}>{value} </div>)}</div></div>
                                    </div>
                            </div>
                            </div>
                            <div className={styles.edit_btns}>
                                <div className={styles.edit_btn_box}><button className={`${styles.edit_btn} ${styles.edit}`} onClick={(e)=>{e.preventDefault(); setEdit((prev=>!prev))}}>취소</button></div>
                                <div className={styles.edit_btn_box}><button className={`${styles.edit_btn} ${styles.edit}`} type='submit'>완료</button></div>
                            </div>
                    </form>
                        // edit 상태면 위의 양식을 출력 
                    :
                        // edit 상태가 아니면 아래 양식을 출력
                    <div className={styles.out_box}>
                            <div className={styles.content_box}>
                                {/* 이메일 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>💌이메일</div> 
                                        <div className={styles.right}>{myInfo.email}</div>
                                    </div>
                                </div>
                                {/* 휴대폰 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>📞휴대폰</div> 
                                        <div className={styles.right}>{myInfo.phone}</div>
                                    </div>
                                </div>
                                {/* 자격증 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>📜자격증</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(myInfo.license).map((value, index)=> <div key={`${value}-${index}`}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                                {/* 수상 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>🏆수상</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(myInfo.awards).map((value, index)=> <div key={`${value}-${index}`}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                                {/* 경력 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>👨‍🎓경력</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(myInfo.career).map((value, index)=> <div className={styles.awards_box} key={`${value}-${index}`}>{value} </div>)}</div></div>
                                    </div>
                                </div>
                            </div>
                        <div className={styles.edit} onClick={()=>setEdit(true)}>수정<img className={styles.edit_img} src='/edit.png' alt='edit.png'></img></div>
                    </div>
                    }
        </div>
    )
}

export default TrainerMyPageMyInfo