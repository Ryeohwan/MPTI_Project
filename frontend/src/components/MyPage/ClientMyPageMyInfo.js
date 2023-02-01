import styles from './ClientMyPageMyInfo.module.css'
import {useState} from 'react'
const ClientMyPageMyInfo = () => {
    const info_list=['이름', '성별', '생년월일', '이메일', '핸드폰']
    const get_info = {name:'정원철', gender:'남', birth: '1997.01.01', email:'dnjscjf@naver.com', phone:'010-1234-5678'}
    const [edit,setEdit] = useState(false);
    // console.log(get_info[Object.keys(get_info)[0]])
    return(
        <div className={styles.container}> 
            {edit?
            <form className={styles.out_box} method='PUT' onSubmit={(e) => {e.preventDefault(); setEdit(false);}}>
                <div className={styles.in_box}>
                    <div className={styles.in_box_title}>✔ 인적사항</div>
                    {Object.values(get_info).map((value, index)=>
                    <div className={styles.in_box_content} key={index}>
                        <div className={styles.left}>{info_list[index]}</div>{index<3?<div className={styles.right}>{value}</div>:<input type='text' defaultValue={value} className={styles.right}></input>}
                    </div>)}
                </div>
                <div className={styles.edit_btn_box}><button className={styles.edit_btn} type='submit'>완료✔</button></div>
                
            </form>
                // edit 상태면 위의 양식을 출력 
            :
                // edit 상태가 아니면 아래 양식을 출력
            <div className={styles.out_box}>
                <div className={styles.in_box}>
                    <div className={styles.in_box_title}>✔ 인적사항</div>
                    {Object.values(get_info).map((value, index)=>
                    <div className={styles.in_box_content} key={index}>
                        <div className={styles.left}>{info_list[index]}</div> <div className={styles.right}>{value}</div>
                    </div>)}
                </div>
                <div className={styles.edit} onClick={()=>setEdit(true)}>수정🖍</div>
            </div>
            }
            
            
        </div>
    );
}


export default ClientMyPageMyInfo