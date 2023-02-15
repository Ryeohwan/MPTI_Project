import React, { useState } from "react";
import styles from "./HeaderComponent.module.css"

const HeaderComponent = (props) => {

    return(
        <div className={styles.video_header}>
            <img src="/MPTIlogo.png" className={styles.image} alt="MPTI"></img>
            <div className={styles.time}>{(parseInt(props.seconds/60)).toString().padStart(2,0)}:{ (props.seconds%60).toString().padStart(2,0)}</div>
        </div>
    )
}



export default HeaderComponent