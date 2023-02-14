import styles from "./ReportModalContainer.module.css";


const ReportModalContainer = ({ children, onClose }) => (
    <div className={styles.ReportModalContainer}>
        <div className={styles.main}>
            {children}
        </div>
    </div>
);

export default ReportModalContainer;