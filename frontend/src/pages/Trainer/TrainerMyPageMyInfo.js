import styles from './TrainerMyPageMyInfo.module.css'
import {useState, useEffect} from 'react'

export default function TrainerMyPageMyInfo(){
    const [trainerinfo, setTrainerInfo] = useState({});
    const [edit,setEdit] = useState(false);
    const form_data = ['💌이메일','📞휴대폰', '📜자격증', '🏆수상', '👨‍🎓경력']

    useEffect(()=>{
        async function get_info(){
            setTrainerInfo(() => ({email:'asfdd@naver.com', phone:'010-1234-5678', cert:['생활스포츠지도사','건강운동관리사','NSCA'], 
            prize:['서울특별시장배 보디빌딩대회','나바(NABBA) 대회', 'WBC대회'], career:[{name:'저스트짐 역삼점', time:'2019.01~2020.03'},{name:'저스트쥠', time:'2021.03~2022.04'}]})
            )
        }
        get_info()
},[])

    return(
        <div className={styles.container}> 
            {edit?
            <form className={styles.out_box} method='PUT' onSubmit={(e) => {e.preventDefault(); console.log('a'); setEdit(false);}}>
                <div className={styles.in_box}>
                    <div className={styles.in_box_content}>
                        <div className={styles.left}>💌💟💌💢✝🕳💫💨이메일</div>
                        <input type='text' defaultValue={trainerinfo.email} className={styles.right}></input>
                    </div>
                </div>
                <div className={styles.edit_btn_box}><button className={styles.edit_btn} type='submit'>완료✔</button></div>
                
            </form>
                // edit 상태면 위의 양식을 출력 
            :
                // edit 상태가 아니면 아래 양식을 출력
            <div className={styles.out_box}>
                    <div className={styles.content_box}>
                        {Object.entries(trainerinfo).map()}
                        {Object.values(trainerinfo).map((value, index)=>
                            <div className={styles.in_box} key={value}>
                                <div className={styles.in_box_content}>
                                    <div className={styles.left}>{form_data[index]}</div> 
                                    <div className={styles.right}>{index<4?(typeof(value)===Object?value.map((value2) => <div key={value2}>{value2}</div>):<div>{value}</div>)
                                    :value.map((value2)=><div key={value2}>{value2.name} {value2.time}</div>)}</div>
                                </div>
                            </div>
                        )}
                    </div>
                <div className={styles.edit} onClick={()=>setEdit(true)}>수정🖍</div>
            </div>
            }
            
            
        </div>
    )
}