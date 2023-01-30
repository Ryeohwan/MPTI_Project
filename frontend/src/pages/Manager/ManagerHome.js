import React from 'react';
import styles from './ManagerHome.module.css';
import trainerImg from '../../assets/img/trainer.PNG';
import ManagerHeader from './Header/ManagerHeader';
import ManagerNavigation from './Navigation/ManagerNavigation';
import ManagerSignupApproval from './ManagerSignupApproval';

const ManagerHome = () => {
    return (
        <div className={styles.ManagerHome} >

            <ManagerHeader/>
            <div className={styles.info_box}>
         
                <ManagerNavigation/>
                <ManagerSignupApproval/>


                
            </div>
            
        </div>
    );
};

export default ManagerHome;