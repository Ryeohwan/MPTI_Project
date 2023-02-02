import React,{useRef,useEffect, useState} from 'react';
import styles from './ClientMyLog.module.css'
import TopTitle from '../../components/Common/TopTitle'
import { Doughnut } from "react-chartjs-2";
import {Chart, ArcElement} from 'chart.js'
import { axios } from 'axios';
Chart.register(ArcElement)

const workoutData=[1,2,4,5,2,1,2,0];

const ClientMyLog = () => {
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


    const [age, setAge]= useState(18);
    const [gender, setGender]= useState("female");
    const [height, setHeight]= useState(150);
    const [weight, setWeight]= useState(40);
    const [result, setResult]= useState({
        bmi: "",
        msg: "",
        isChk: true,
    })


    useEffect(()=>{
        const sets= [{...analyze.datasets, data: workoutData,}]
        setAnalyze({...analyze, datasets:sets})
    }, [])

    const ageSlideHandler = (e)=>{
        if(e.target.value>70){
            setAge(70);
            return;
        }
        setAge(e.target.value);
    }

    const heightSlideHandler = (e)=>{
        if(e.target.value>250){
            setHeight(250);
            return;
        }
        setHeight(e.target.value);
    }

    const weightSlideHandler = (e)=>{
        if(e.target.value>200){
            setWeight(200);
            return;
        }
        setWeight(e.target.value);
    }

    const bmiHandler = ()=>{
        let bmi = ((weight/(height * height))*10000).toFixed(2);

        if (gender === 'male') {
          if (bmi < 20.7) {
            return setResult({bmi: bmi, msg: '저체중'});
          } else if (bmi >= 20.7 && bmi < 26.4) {
            return setResult({bmi: bmi, msg: '정상체중'});
          } else {
            return setResult({bmi: bmi, msg: '과체중'});
          }
        } else if (gender === 'female') {
          if (bmi < 19.1) {
            return setResult({bmi: bmi, msg: '저체중'});
          } else if (bmi >= 19.1 && bmi < 25.8) {
            return setResult({bmi: bmi, msg: '정상체중'});
          } else {
            return setResult({bmi: bmi, msg: '과체중'});
          }
        }else{
            return;
        }

        setResult({...result,isChk:false})
    }


    return (
        <div className={styles.ClientMyLog}>
            <TopTitle title='운동기록▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 !'/>
         

            <div className={styles.log_box}>
                <div className={styles.log_graph}>
                    <div className={styles.graph_part}>부위</div>
                    <div className={styles.graph_chart}>  <Doughnut style={{width:"9 0%"}} data={analyze} /></div>
                </div>

                <div className={styles.log_recommend}>
                    <div className={styles.recommend_text}>추천</div>
                </div>
            </div>

            <div className={styles.title}>BMI지수를 확인하세요!</div>

            <div className={styles.sub_content}>

               
                <div className={styles.sub_info}>

                    <div className={styles.info_question}>

                       
                    <div className={styles.info_select}>
                        <div className={styles.info_title}>성별을 입력하세요 </div>
                
                        <select defaultValue={""} onChange={(e)=>setGender(e.target.value)}>
                            <option value={"male"}>남</option>
                            <option value={"female"}>여</option>
                        </select>
                        </div>
                        <div className={styles.info_title}>나이를 설정하세요 (세) </div>
                        <div className={styles.info_select}>
                        <input value={age} type="range"  min="0" max="70" onChange={ageSlideHandler}/>
                        <input value={age} type='number' min="0" max="70" onChange={ageSlideHandler}/>
                        </div>



                        
                        <div className={styles.info_title}>신장을 입력하세요 (cm) </div>
                        <div className={styles.info_select}>
                        <input value={height} type="range"  min="0" max="250"  onChange={heightSlideHandler}/>
                        <input value={height} type='number' min="0" max="250" onChange={heightSlideHandler}/>
                        </div>

                      
                        <div className={styles.info_title}>체중을 입력하세요 (kg)</div>
                        <div className={styles.info_select}>
                        <input value={weight} type="range"  min="0" max="200"  onChange={weightSlideHandler}/>
                        <input value={weight} type='number' min="0" max="200" onChange={weightSlideHandler}/>
                        </div>

                        
                        <button className={styles.bmi_btn}onClick={bmiHandler}>BMI 측정</button>

                    </div>
                    <div className={styles.info_result}>
                       <h3>나의 체질량 지수(BMI) 결과</h3>
                
                       <div className={styles.bmi}>체질량 지수(BMI)란?
BMI는 몸무게를 신장으로 나눈 수치로 저체중, 정상체중, 과체중, 혹은 비만 중 어디에 속하는지를 알려줍니다. 전문가들은 환자의 만성질환 위험을 가늠하기 위해 BMI를 사용하기도 합니다. 주의: BMI는 신장과 체중만을 이용한 결과이기 때문에 체지방량을 대표하지는 않습니다. 그러므로 지방량, 근육량, 혹은 뼈 무게를 구분할 수 없습니다.</div>
                       

                       <div className={styles.result}>
                       {!result.isChk ? <div>고객님의 bmi수치는 <span>{result.bmi}</span>  입니다. 이는 {
                       
                       result.msg==="저체중" || result.msg==="과체중"  ? <span style={{color: "red"}}>{result.msg} 상태</span>: <span style={{color: "blue"}}>{result.msg} 상태</span>} 입니다. </div>:null}
                       </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientMyLog;