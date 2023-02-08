import styles from './TrainerMyPageMyInfo.module.css'
import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";

const request_url = '/api/trainer/info/update/'
// const trainer_id = 'qwer@naver.com'

const TrainerMyPageMyInfo=(props)=>{
    const {email} = useSelector((state) => state.etc);
    const [edit,setEdit] = useState(false);
    console.log('1번 랜더링')
    const setInfo = async (e) => {
        e.preventDefault()
        if(e.target.phone.value!==props.trainerInfo.phone){
            const data = await axios.post(request_url+email, {phone:e.target.phone.value})
            props.setTrainerInfo(data.data)
            setEdit(false);
            return;
        }
        setEdit(false)
    }


    return(
        <div className={styles.container}> 
            <div className={styles.content_title}>내 개인정보</div>
            {
                props.trainerInfo===null?null:
                edit?
                    <form className={styles.out_box} method='PoST' onSubmit={(e) => {setInfo(e);}}>
                        <div className={styles.content_box}>
                            {/* 이메일 */}
                            <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>💌이메일</div> 
                                        <div className={styles.right}>{props.trainerInfo.email}</div>
                                    </div>
                                </div>
                            {/* 휴대폰 */}
                            <div className={styles.in_box}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>📞휴대폰</div> 
                                    <input name="phone" defaultValue={props.trainerInfo.phone} className={`${styles.right} ${styles.input_box}`}></input>
                                </div>
                            </div>
                            {/* 자격증 */}
                            <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>📜자격증</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(props.trainerInfo.license).map((value, index)=> <div key={index}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                            {/* 수상 */}
                            <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>🏆수상</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(props.trainerInfo.awards).map((value, index)=> <div key={index}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                            {/* 경력 */}
                            <div className={styles.in_box}> 
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>👨‍🎓경력</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(props.trainerInfo.career).map((value, index)=> <div className={styles.awards_box} key={index}>{value} </div>)}</div></div>
                                    </div>
                            </div>
                            </div>
                            <div className={styles.edit_btn_box}><button className={`${styles.edit_btn} ${styles.edit}`} type='submit'>완료✔</button></div>
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
                                        <div className={styles.right}>{props.trainerInfo.email}</div>
                                    </div>
                                </div>
                                {/* 휴대폰 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>📞휴대폰</div> 
                                        <div className={styles.right}>{props.trainerInfo.phone}</div>
                                    </div>
                                </div>
                                {/* 자격증 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>📜자격증</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(props.trainerInfo.license).map((value,index)=> <div key={index}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                                {/* 수상 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>🏆수상</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(props.trainerInfo.awards).map((value,index)=> <div key={index}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                                {/* 경력 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>👨‍🎓경력</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(props.trainerInfo.career).map((value,index)=> <div className={styles.awards_box} key={index}>{value} </div>)}</div></div>
                                    </div>
                                </div>
                            </div>
                        <div className={styles.edit} onClick={()=>setEdit(true)}>수정🖍</div>
                    </div>
                    }
        </div>
    )
}

export default TrainerMyPageMyInfo