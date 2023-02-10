import React from "react";
import styles from "./CalendarModal.module.css";

const CalendarModal = (props) => {
  const { open, reservedData } = props;
  const reservedModal = reservedData.map((item) => <div>{item.hour}{item.userName}</div>)

  return (
    <div className={open ? `${styles.openmodal}` : `${styles.Modal}`}>
      {open ? (
        <div className={styles.modalContent}>
          { reservedData.length !== 0 ? (
              <div>
                {reservedModal}
              </div>
            ) : <div>예약된 레슨이 없습니다.</div>}
        </div>
      ) : null}
    </div>
  );
};

export default CalendarModal;
