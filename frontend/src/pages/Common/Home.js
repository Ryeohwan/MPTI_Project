import React from 'react';
import styles from "./Home.module.css"
// import TrainerImg from "./../../assets/img/trainer.PNG"
// import TopTitle from '../../components/Common/TopTitle'
import Calendar from '../../components/Calendar/Calendar';

const Home = () => {
    
    return (
        <div className={styles.Home}>
            

            <Calendar/>
        </div>
    );
};

export default Home;