import React from "react";
import styles from "./VideoClientLog.module.css"
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { sendLog } from "../../../store/etc";
const VideoClientLog = (props) => {
    const dispatch = useDispatch()
    const formRef = useRef()


const handleSubmit = (e) => {
    e.preventDefault()
    const data = [props.clientId, props.trainerId]
    Array.from(formRef.current).map((item,index) => {index<8?(item.checked && data.push(item.name)):(index===8 && data.push(item.value))})
    dispatch(sendLog(data)).then(res=>console.log(res))
}
    return(
        <div style={{display:props.logDisplay}}>
            <form ref={formRef} className={styles.log_box} onSubmit={(e) =>{handleSubmit(e)}}>
                <div className={styles.top_title}>
                    운동 부위
                </div>
                <div className={styles.check_outbox}>
                    
                    <div className={styles.check_inbox}>
                        <label className={styles.check_label} htmlFor="shoulder">어깨</label>
                        <input className={styles.check_content} type="checkbox" id="shoulder" name="shoulder"></input>
                    </div>

                    <div className={styles.check_inbox}>
                        <label className={styles.check_label} htmlFor="chest">가슴</label>
                        <input className={styles.check_content} type="checkbox" id="chest" name="chest"></input>
                    </div>

                    <div className={styles.check_inbox}>
                        <label className={styles.check_label} htmlFor="back">등</label>
                        <input className={styles.check_content} type="checkbox" id="back" name="back"></input>
                    </div>

                    <div className={styles.check_inbox}>
                        <label className={styles.check_label} htmlFor="core">코어</label>
                        <input className={styles.check_content} type="checkbox" id="core" name="core"></input>
                    </div>

                    <div className={styles.check_inbox}>
                        <label className={styles.check_label} htmlFor="triceps">삼두</label>
                        <input className={styles.check_content} type="checkbox" id="triceps" name="triceps"></input>
                    </div>

                    <div className={styles.check_inbox}>
                        <label className={styles.check_label} htmlFor="biceps">이두</label>
                        <input className={styles.check_content} type="checkbox" id="biceps" name="biceps"></input>
                    </div>

                    <div className={styles.check_inbox}>
                        <label className={styles.check_label} htmlFor="legs">하체</label>
                        <input className={styles.check_content} type="checkbox" id="legs" name="legs"></input>
                    </div>

                    <div className={styles.check_inbox}>
                        <label className={styles.check_label} htmlFor="aerobic">유산소</label>
                        <input className={styles.check_content} type="checkbox" id="aerobic" name="aerobic"></input>
                    </div>
                </div>
                <div className={styles.top_title}>
                    특이사항
                </div>
                <textarea placeholder="고객님의 특이사항을 적어주세요." type="text" className={styles.input_box} name="content"/>
                <div className={styles.button_box}>
                    <button className={styles.exit_button} onClick={(e)=>{e.preventDefault();props.toggleLog();}}>닫기</button>
                    <button className={styles.send_button} type="submit">제출</button>
                </div>
            </form>
        </div>
    )
}

export default VideoClientLog