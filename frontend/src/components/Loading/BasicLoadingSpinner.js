import React from 'react';
import styles from './BasicLoadingSpinner.module.css'
import Spinner from '../../assets/spinner/back-spinner.gif';
export const BasicLoadingSpinner = () => {
  return <div className={styles.LoadingBackground}>
        <img className={styles.LoadingImg} src={Spinner} alt="로딩중" />
        <div className={styles.LoadingText} >LOADING</div>
        
   </div>;
};

export default BasicLoadingSpinner;