import styles from './TopTitle.module.css'

export default function BodyTitle(props) {
    
    return(
        <div className={styles.body_title_box}>
            <div className={styles.body_title_bigtxt}>
                {props.title}
            </div>
            <div className={styles.body_title_smtxt}>
                {props.content}
            </div>
        </div>
    )

}