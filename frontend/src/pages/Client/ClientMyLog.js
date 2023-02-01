import React,{useRef} from 'react';
import styles from './ClientMyLog.module.css'
import TopTitle from '../../components/Common/TopTitle'
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);
const data = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [303, 20, 130],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],  
      }
    ]
  };

const ClientMyLog = () => {

    const ageInputRef= useRef();
    const genderInputRef= useRef();
    const heightInputRef= useRef();
    const weightInputRef= useRef();



    return (
        <div className={styles.ClientMyLog}>
            <TopTitle title='운동기록▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 !'/>
         

            <div className={styles.log_box}>
                <div className={styles.log_graph}>
                    <div className={styles.graph_part}>부위</div>
                    <div className={styles.graph_chart}>  <Doughnut style={{width:"9 0%"}} data={data} /></div>
                </div>

                <div className={styles.log_recommend}>
                    <div className={styles.recommend_text}>추천</div>
                </div>
            </div>


            <div className={styles.sub_content}>

                <div className={styles.sub_title}>BMI지수를 확인하세요!</div>
                <div className={styles.sub_info}>

                    <div className={styles.info_question}>
                        <div>고객님의 나이를 입력하세요 ! </div>
                        <input></input>

                        <div>고객님의 나이를 입력하세요 ! </div>
                        <select>
                            <option>남</option>
                            <option>여</option>
                        </select>

                        <div>고객님의 신장을 입력하세요 ! </div>
                        <input></input>

                        <div>고객님의 체중을 입력하세요 !</div>
                        <input></input>

                       


                    </div>
                    <div className={styles.info_result}>

                        결과 부분
                    </div>





                </div>

            </div>


        </div>
    );
};

export default ClientMyLog;