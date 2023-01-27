import styles from './TopTitle.module.css'

export default function BodyTitle(props) {
    
    return(
        <div className={styles.body_title_box}>
            <p className={styles.body_title_bigtxt}>
                {props.title}
            </p>
            <p className={styles.body_title_smtxt}>
                {props.content}
            </p>
        </div>
    )

}