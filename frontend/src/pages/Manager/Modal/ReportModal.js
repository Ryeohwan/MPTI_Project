import styles from "./ReportModal.module.css";

const ReportModal = ({ title, content, onClose }) => (
    <div className={styles.ReportModal}>
        <h2>신고처리</h2>
        <p>{content}</p>
        <button onClick={onClose}>Close</button>
    </div>
);

export default ReportModal;