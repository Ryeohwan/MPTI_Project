import React from 'react'
import styles from './ClientLogCard.module.css'

const ClientLogCard = () => {
    const date = "2022.03.13"
    const part = "이두, 삼두, 어깨"
    const content = "하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함하체 운동 안함, 상체운동만 함"

    return(
        <div className={styles.item}>
                        <div className={styles.date}>{date}</div>    
                        <div className={styles.content_txt}>운동 부위</div>
                        <div className={styles.content_box}>{part}</div>
                        <div className={styles.content_txt}>특이 사항</div>
                        <div className={styles.content_box2}>{content}</div> 
        </div>
    )
}

export default ClientLogCard