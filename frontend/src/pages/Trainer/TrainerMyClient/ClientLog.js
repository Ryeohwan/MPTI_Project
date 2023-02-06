import React, {useState, useEffect} from 'react';
import styles from './ClientLog.module.css'
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement)
const workoutData=[1,2,4,5,2,1,2,0];

const ClientLog = (props) => {
    const clientId = props.id

    
    const [analyze, setAnalyze] = useState({
        labels: ["biceps", "triceps", "chest","legs", "shoulder", "back", "core", "aerobic" ],
        datasets: [
          {
            data: [0,0,0,0,0,0,0,0],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56" , "#36A2EB", "#FFCE56" ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56" , "#36A2EB", "#FFCE56" ],
          }
        ]
      });

    useEffect(()=>{
        const sets= [{...analyze.datasets, data: workoutData,}]
        setAnalyze({...analyze, datasets:sets})
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.flex_column}>
                <div className={styles.big_txt}>운동기록</div>
                <div className={styles.midium_txt}>회원님의 운동기록을 확인해보세요</div>
                <div className={styles.grid_2_column}>
                    <div className={styles.box_small}><div className={styles.shoulder}></div> 어깨 </div>
                    <div className={styles.box_small}><div className={styles.back}></div> 등 </div>
                    <div className={styles.box_small}><div className={styles.bicep}></div> 이두 </div>
                    <div className={styles.box_small}><div className={styles.core}></div> 코어 </div>
                    <div className={styles.box_small}><div className={styles.triceps}></div> 삼두 </div>
                    <div className={styles.box_small}><div className={styles.lower_body}></div> 하체 </div>
                    <div className={styles.box_small}><div className={styles.chest}></div> 가슴 </div>
                    <div className={styles.box_small}><div className={styles.aerobic}></div> 유산소 </div>
                </div>
            </div>
            <div>  <Doughnut style={{width:"9 0%"}} data={analyze} /></div>
        </div>
    )
}

export default ClientLog