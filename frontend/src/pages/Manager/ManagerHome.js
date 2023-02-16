import React from 'react';
import styles from './ManagerHome.module.css';
import ManagerHeader from './Header/ManagerHeader';
import ManagerNavigation from './Navigation/ManagerNavigation';
import ManagerSignupApproval from './ManagerSignupApproval';
import ManagerAccountManagement from './ManagerAccountManagement';
import { Route, Routes } from 'react-router-dom';
import ManagerReportApproval from './ManagerReportApproval';

const ManagerHome = () => {
    return (
        <div className={styles.ManagerHome} >
            <ManagerHeader/>
            <div className={styles.info_box}>
                <ManagerNavigation/>
                <Routes>
                    <Route path='/home' element={<ManagerSignupApproval/>}/>
                    <Route path='/account' element={<ManagerAccountManagement/>}/>
                    <Route path='/report' element={<ManagerReportApproval/>}/>
                </Routes>
            </div>
        </div>
    );
};

export default ManagerHome;