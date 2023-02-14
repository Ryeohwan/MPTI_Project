import React from 'react'
import styles from './ClientLogCard.module.css'

const ClientLogCard = (props) => {

    return(
        <div className={styles.item}>
                        <div className={styles.date}>{props.data.date}</div>    
                        <div className={styles.content_txt}>운동 부위</div>
                        <div className={styles.content_box}>{props.data.part.map(it=>{
                            return(
                                <span> {it}</span>
                            )
                        })}</div>
                        <div className={styles.content_txt}>특이 사항</div>
                        <div className={styles.content_box2}>{props.data.record}</div> 
        </div>
    )
}

export default ClientLogCard