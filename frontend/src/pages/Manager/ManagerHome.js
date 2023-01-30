import React from 'react';
import styles from './ManagerHome.module.css';
import ManagerHeader from './Header/ManagerHeader';
import ManagerNavigation from './Navigation/ManagerNavigation';
import ManagerSignupApproval from './ManagerSignupApproval';
import ManagerReportApproval from './ManagerReportApproval';

const ManagerHome = () => {
    return (
        <div className={styles.ManagerHome} >
            <ManagerHeader/>
            <div className={styles.info_box}>
                <ManagerNavigation/>
                {/* <ManagerSignupApproval/> */}
                <ManagerReportApproval/>
            </div>
        </div>
    );
};

export default ManagerHome;