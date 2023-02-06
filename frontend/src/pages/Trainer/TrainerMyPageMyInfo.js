import styles from './TrainerMyPageMyInfo.module.css'
import {useState, useEffect, memo} from 'react'
import axios from 'axios';
const request_url = '/api/trainer/info/'
const trainer_id = 'qwer@naver.com'

const TrainerMyPageMyInfo=(props)=>{
    const [trainerinfo, setTrainerInfo] = useState(null);
    const [edit,setEdit] = useState(false);
    
    useEffect(()=>{
        async function get_info(){
            const data =await axios.get(request_url+trainer_id)
            setTrainerInfo(data.data)
        }
        get_info()
    }, [])
    return(
        <div className={styles.container}> 
            <div className={styles.content_title}>내 개인정보</div>
            {
                trainerinfo===null?null:
                edit?
                    <form className={styles.out_box} method='PUT' onSubmit={(e) => {e.preventDefault(); setEdit(false);}}>
                        <div className={styles.content_box}>
                            {/* 이메일 */}
                            <div className={styles.in_box}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>💌이메일</div> 
                                    <input defaultValue={trainerinfo.email} className={`${styles.right} ${styles.input_box}`}></input>
                                </div>
                            </div>
                            {/* 휴대폰 */}
                            <div className={styles.in_box}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>📞휴대폰</div> 
                                    <input defaultValue={trainerinfo.phone} className={`${styles.right} ${styles.input_box}`}></input>
                                </div>
                            </div>
                            {/* 자격증 */}
                            <div className={styles.in_box}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>📜자격증</div> 
                                    <div className={styles.right}>
                                        <div className={styles.right}>{JSON.parse(trainerinfo.license).map((value)=>    
                                            <input className={`${styles.right} ${styles.input_box}`} defaultValue={value} key={value}></input>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 수상 */}
                            <div className={styles.in_box}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>🏆수상</div> 
                                    <div className={styles.right}>
                                        <div className={styles.right}>{JSON.parse(trainerinfo.awards).map((value)=> 
                                            <input className={`${styles.right} ${styles.input_box}`} defaultValue={value} key={value}></input>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 경력 */}
                            <div className={styles.in_box}> 
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>👨‍🎓경력</div> 
                                    <div className={styles.right}>
                                        <div className={styles.right}>{JSON.parse(trainerinfo.career).map((value)=> 
                                            <div className={`${styles.awards_box} ${styles.right}`}>
                                                <input className={styles.input_box} defaultValue={value} key={value}></input>
                                            </div>)
                                            }
                                        </div>
                                    </div>
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
                                        <div className={styles.right}>{trainerinfo.email}</div>
                                    </div>
                                </div>
                                {/* 휴대폰 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>📞휴대폰</div> 
                                        <div className={styles.right}>{trainerinfo.phone}</div>
                                    </div>
                                </div>
                                {/* 자격증 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>📜자격증</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(trainerinfo.license).map((value)=> <div key={value}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                                {/* 수상 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>🏆수상</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(trainerinfo.awards).map((value)=> <div key={value}>{value}</div>)}</div></div>
                                    </div>
                                </div>
                                {/* 경력 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>👨‍🎓경력</div> 
                                        <div className={styles.right}><div className={styles.right}>{JSON.parse(trainerinfo.career).map((value)=> <div className={styles.awards_box} key={value.name}>{value} </div>)}</div></div>
                                    </div>
                                </div>
                            </div>
                        <div className={styles.edit} onClick={()=>setEdit(true)}>수정🖍</div>
                    </div>
                    }
        </div>
    )
}



export default memo(TrainerMyPageMyInfo)