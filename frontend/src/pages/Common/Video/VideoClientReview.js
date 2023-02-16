import React from "react";
import styles from './VideoClientReview.module.css'
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { sendLog, writeReview } from "../../../store/etc";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";

const VideoClientReview = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [star, setStar] = useState(0);
    const memo = useRef();
    const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(memo.current.value)
    // console.log(star.current.value)
    if(memo.current.value.length<10){
        alert('별점과 내용을 10자 작성하여 제출해주세요.')
    } else {
        dispatch(writeReview(props.clientId, props.trainerId, parseInt(star), memo.current.value, props.clientName, props.trainerName))
        navigate('/user/home')
    }
}
const starRate = (star) => {
    const elements = [];
    for (let i = 0; i < star; i++) {
      elements.push(
        <Icon
          key={`full-${i}`}
          onClick={() => setStar(i+1)}
          icon="openmoji:star"
          className={styles.star_icon}
        ></Icon>
      );
    }
    for (let i = 0; i < 5 - star; i++) {
      elements.push(
        <Icon
          key={`blank-${i}`}
          onClick={() => setStar(i+1+star)}
          icon="ic:round-star-border"
          className={styles.border_star_icon}
        ></Icon>
      );
    }
    return elements;
}
    return(
        <div style={{display:props.reviewDisplay}}>
            <form className={styles.log_box} onSubmit={(e) =>{handleSubmit(e)}}>
                <div className={styles.top_title}>
                    리뷰
                </div>
                <div>{starRate(star)}</div>
                <textarea ref={memo} placeholder="리뷰를 작성해 주세요." type="text" className={styles.input_box} name="content"/>
                <div className={styles.button_box}>
                    <button className={styles.exit_button} onClick={(e)=>{e.preventDefault();navigate('/user/home')}}>닫기</button>
                    <button className={styles.send_button} type="submit">제출</button>
                </div>
            </form>
        </div>
    )
}

export default VideoClientReview