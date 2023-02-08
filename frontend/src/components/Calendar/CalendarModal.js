import React from "react";
import styles from "./CalendarModal.module.css";
const CalendarModal = (props) => {
  const { open, close, header } = props;

  return (
    <div className={open ? `${styles.openModal}` : `${styles.modal}`}>
      {open ? (
        <section>
          <header>
            {header}
            <button className={styles.closeBtn} onClick={close}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            <button className={styles.closeBtn} onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default CalendarModal;
