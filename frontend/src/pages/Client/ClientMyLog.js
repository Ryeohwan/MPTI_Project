import React, { useRef, useEffect, useState } from 'react';
import styles from './ClientMyLog.module.css'
import TopTitle from '../../components/Common/TopTitle'
import { workoutList } from '../../store/etc';
import { Doughnut, Bar } from "react-chartjs-2";
import { Chart, ArcElement } from 'chart.js'

import { useDispatch, useSelector } from 'react-redux';

Chart.register(ArcElement)


const ClientMyLog = () => {
  const dispatch=useDispatch();
  const {email} = useSelector((state) => state.auth)


  const [analyze, setAnalyze] = useState({
    labels: ["biceps", "triceps", "chest", "legs", "shoulder", "back", "core", "aerobic"],
    datasets: [
      {
        data: [1, 2, 4, 5, 2, 1, 2, 0],
        backgroundColor: ["red", "orange", "green", "yellow", "pink", "skyblue", "blue", "purple"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56", "#36A2EB", "#FFCE56"],
      }
    ]
  });

  useEffect(() => {
    
    dispatch(workoutList(email)).then(res=>{
      const workoutlist= Object.values(res);
     setAnalyze({...analyze, datasets: [
      {
        data: workoutlist,
        backgroundColor: ["red", "orange", "green", "yellow", "pink", "skyblue", "blue", "purple"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56", "#36A2EB", "#FFCE56"],
      }
    ] })
      console.log(workoutlist);
    })
  },[]);
  
  const [userInfo, setUserInfo] = useState({
    age: 18,
    gender: "female",
    height: 150,
    weight: 40,
    bmi: "",
    msg: "",
    isChk: true,
  })

  const userInfoChangeHandler = (e) => {
    switch (e.target.name) {
      case "age":
        e.target.value > 70 ?
          setUserInfo({ ...userInfo, age: 70 }) :
          setUserInfo({ ...userInfo, age: e.target.value });
        break;
      case "weight":
        e.target.value > 200 ?
          setUserInfo({ ...userInfo, weight: 200 }) :
          setUserInfo({ ...userInfo, weight: e.target.value });
        break;
      case "height":
        e.target.value > 250 ?
          setUserInfo({ ...userInfo, height: 250 }) :
          setUserInfo({ ...userInfo, height: e.target.value });
        break;
      default:
        console.log("유효한 입력이 아닙니다. 확인부탁드립니다.");
    }
  }




  const bmiHandler = () => {
    let bmi = ((userInfo.weight / (userInfo.height * userInfo.height)) * 10000).toFixed(2);
    if (userInfo.gender === 'male') {
      if (bmi < 20.7) {
        setUserInfo({ ...userInfo, bmi: bmi, msg: '저체중', isChk: false });
      } else if (bmi >= 20.7 && bmi < 26.4) {
        setUserInfo({ ...userInfo, bmi: bmi, msg: '정상체중', isChk: false });
      } else {
        setUserInfo({ ...userInfo, bmi: bmi, msg: '과체중', isChk: false });
      }
    } else if (userInfo.gender === 'female') {
      if (bmi < 19.1) {
        setUserInfo({ ...userInfo, bmi: bmi, msg: '저체중', isChk: false });
      } else if (bmi >= 19.1 && bmi < 25.8) {
        setUserInfo({ ...userInfo, bmi: bmi, msg: '정상체중', isChk: false });
      } else {
        setUserInfo({ ...userInfo, bmi: bmi, msg: '과체중', isChk: false });
      }
    }
  }


  return (
    <div className={styles.ClientMyLog}>
      <TopTitle title='운동기록▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 !' />

      <div className={styles.log_box}>
        <div className={styles.log_graph}>
          <div className={styles.graph_part}><Doughnut style={{width:"200px"}} data={analyze}/></div>
          {/* <div className={styles.graph_chart}></div> */}
          <div className={styles.graph_info}>
            
              <div className={styles.part}>
                  <div style={{backgroundColor:"red"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>가슴</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"pink"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>어깨</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"skyblue"}}  className={styles.part_color}></div>
                  <div className={styles.part_name}>등부</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"green"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>하체</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"yellow"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>이두</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"purple"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>삼두</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"orange"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>산소</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"blue"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>코어</div>
              </div>
        

          </div>
        </div>
     
        <div className={styles.log_recommend}>
          <h3>추천</h3>
          <br/>
          
          고객님의 MPTI는 ABCD입니다.
          <br></br>
          [불가리안 스쿼트]
        </div>
      </div>

      <div className={styles.title}>BMI지수를 확인하세요!</div>

      <div className={styles.sub_content}>


        <div className={styles.sub_info}>

          <div className={styles.info_question}>


            <div className={styles.info_select}>
              <div className={styles.info_title}>성별을 입력하세요 </div>

              <select defaultValue={""}  onChange={(e) => setUserInfo({...userInfo, gender:e.target.value})}>
                <option value={"male"}>남</option>
                <option value={"female"}>여</option>
              </select>
            </div>
            <div className={styles.info_title}>나이를 설정하세요 (세) </div>
            <div className={styles.info_select}>
              <input value={userInfo.age} name="age" type="range" min="0" max="70" onChange={userInfoChangeHandler} />
              <input value={userInfo.age} name="age" type='number' min="0" max="70" onChange={userInfoChangeHandler} />
            </div>

            <div className={styles.info_title}>신장을 입력하세요 (cm) </div>
            <div className={styles.info_select}>
              <input value={userInfo.height} name="height" type="range" min="0" max="250" onChange={userInfoChangeHandler} />
              <input value={userInfo.height} name="height" type='number' min="0" max="250" onChange={userInfoChangeHandler} />
            </div>


            <div className={styles.info_title}>체중을 입력하세요 (kg)</div>
            <div className={styles.info_select}>
              <input value={userInfo.weight} name="weight" type="range" min="0" max="200" onChange={userInfoChangeHandler} />
              <input value={userInfo.weight} name="weight" type='number' min="0" max="200" onChange={userInfoChangeHandler} />
            </div>


            <button className={styles.bmi_btn} onClick={bmiHandler}>BMI 측정</button>

          </div>
          <div className={styles.info_result}>
            <h3>나의 체질량 지수(BMI) 결과</h3>

            <div className={styles.bmi}>체질량 지수(BMI)란?
              BMI는 몸무게를 신장으로 나눈 수치로 저체중, 정상체중, 과체중, 혹은 비만 중 어디에 속하는지를 알려줍니다. 전문가들은 환자의 만성질환 위험을 가늠하기 위해 BMI를 사용하기도 합니다. 주의: BMI는 신장과 체중만을 이용한 결과이기 때문에 체지방량을 대표하지는 않습니다. 그러므로 지방량, 근육량, 혹은 뼈 무게를 구분할 수 없습니다.</div>


            <div className={styles.result}>
              {!userInfo.isChk ? <div>고객님의 bmi수치는 <span>{userInfo.bmi}</span>  입니다. 이는 {

                userInfo.msg === "저체중" || userInfo.msg === "과체중" ? <span style={{ color: "red" }}>{userInfo.msg} 상태</span> : <span style={{ color: "blue" }}>{userInfo.msg} 상태</span>} 입니다. </div> : null}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMyLog;