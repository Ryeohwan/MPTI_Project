import styles from './TrainerMyPageMyInfo.module.css'
import {useState, useEffect} from 'react'

const TrainerMyPageMyInfo=({myInfo})=>{
    console.log(myInfo)
    const a = ['a','b']
    console.log(JSON.stringify(a))
    console.log(2222)
    if(myInfo){
       
    }
    const [edit,setEdit] = useState(false);

    return(
        <div className={styles.container}> 
            <div className={styles.content_title}>내 개인정보</div>
            {
                myInfo===null?null:
                edit?
                    <form className={styles.out_box} method='PUT' onSubmit={(e) => {e.preventDefault(); setEdit(false);}}>
                        <div className={styles.content_box}>
                            {/* 이메일 */}
                            <div className={styles.in_box}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>💌이메일</div> 
                                    <input defaultValue={myInfo.email} className={`${styles.right} ${styles.input_box}`}></input>
                                </div>
                            </div>
                            {/* 휴대폰 */}
                            <div className={styles.in_box}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>📞휴대폰</div> 
                                    <input defaultValue={myInfo.phone} className={`${styles.right} ${styles.input_box}`}></input>
                                </div>
                            </div>
                            {/* 자격증 */}
                            <div className={styles.in_box}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>📜자격증</div> 
                                    <div className={styles.right}>
                                        <div className={styles.right}>{myInfo.cert.map((value)=> 
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
                                        <div className={styles.right}>{myInfo.prize.map((value)=> 
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
                                        <div className={styles.right}>{myInfo.career.map((value)=> 
                                            <div className={`${styles.prize_box} ${styles.right}`}>
                                                <input className={styles.input_box} defaultValue={value.name} key={value.name}></input>
                                                <input   className={styles.input_box} defaultValue={value.time} key={value.time}></input>
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
                                        {/* <div className={styles.right}><div className={styles.right}>{myInfo.cert && myInfo.cert.map((value)=> <div key={value}>{value}</div>)}</div></div> */}
                                    </div>
                                </div>
                                {/* 수상 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>🏆수상</div> 
                                        {/* <div className={styles.right}><div className={styles.right}>{myInfo.prize && myInfo.prize.map((value)=> <div key={value}>{value}</div>)}</div></div> */}
                                    </div>
                                </div>
                                {/* 경력 */}
                                <div className={styles.in_box}>
                                    <div className={styles.in_box_content}>
                                        <div className={styles.left}>👨‍🎓경력</div> 
                                        {/* <div className={styles.right}><div className={styles.right}>{myInfo.career && myInfo.career.map((value)=> <div className={styles.prize_box} key={value}>{value}</div>)}</div></div> */}
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