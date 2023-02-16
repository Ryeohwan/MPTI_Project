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
    labels: ["chest", "back", "biceps", "chest", "core", "legs", "shoulder", "triceps"],
    datasets: [
      {
        data: [],
        backgroundColor: ["#FF3366", "orange", "green", "yellow", "pink", "skyblue", "#0033CC", "purple"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56", "#36A2EB", "#FFCE56"],
      }
    ]
  });

  useEffect(() => {
    
    dispatch(workoutList(email)).then(res=>{
      const workoutlist= Object.values(res);
      const workpartlist=Object.keys(res)
      console.log(workpartlist);
     setAnalyze({
      labels: workpartlist,
      datasets: [
      {
        data: workoutlist,
        backgroundColor: ["#FF3366", "orange", "green", "yellow", "pink", "skyblue", "#0033CC", "purple"],
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
  
  const totalPartCalculator= ()=>{
    return (
      analyze.datasets[0].data.reduce((totalval, curval)=>{
        return  totalval+ curval;
      },0)
    )
  }


  return (
    <div className={styles.ClientMyLog}>
      <TopTitle title='운동기록▼' content='고객님의 운동기록을 확인하며 운동을 해보세요 !' />
      <div className={styles.log_box}>
        <div className={styles.log_graph}>
          <div className={styles.graph_part}>
            {analyze.datasets[0].data.filter(it => 0 === it).length===8?"운동기록이 존재하지 않습니다.":   <Doughnut style={{width:"200px"}} data={analyze}/>}
           
          </div>
        
          <div className={styles.graph_info}>
            
              <div className={styles.part}>
                  <div style={{backgroundColor:"#FF3366"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>가슴 {totalPartCalculator()===0 ? "": `(${Math.floor(analyze.datasets[0].data[0]/totalPartCalculator() *100)})%`}</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"orange"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>어깨 {totalPartCalculator()===0 ? "": `(${Math.floor(analyze.datasets[0].data[1]/totalPartCalculator() *100)})%`} </div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"green"}}  className={styles.part_color}></div>
                  <div className={styles.part_name}>이두 {totalPartCalculator()===0 ? "": `(${Math.floor(analyze.datasets[0].data[2]/totalPartCalculator() *100)})%`}</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"yellow"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>삼두 {totalPartCalculator()===0 ? "": `(${Math.floor(analyze.datasets[0].data[3]/totalPartCalculator() *100)})%`}</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"pink"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>등부 {totalPartCalculator()===0 ? "": `(${Math.floor(analyze.datasets[0].data[4]/totalPartCalculator() *100)})%`}</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"skyblue"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>코어 {totalPartCalculator()===0 ? "": `(${Math.floor(analyze.datasets[0].data[5]/totalPartCalculator() *100)})%`}</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"#0033CC"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>다리 {totalPartCalculator()===0 ? "": `(${Math.floor(analyze.datasets[0].data[6]/totalPartCalculator() *100)})%`}</div>
              </div>

              <div className={styles.part}>
                  <div style={{backgroundColor:"purple"}} className={styles.part_color}></div>
                  <div className={styles.part_name}>산소 {totalPartCalculator()===0 ? "": `(${Math.floor(analyze.datasets[0].data[7]/totalPartCalculator() *100)})%`}</div>
              </div>
        

          </div>
        </div>
     
        <div className={styles.log_recommend}>
          <div className={styles.recommend_title}>MPTI 추천운동</div>
          
          {analyze.datasets[0].data.filter(it => 0 === it).length>4?
          "아직 모든 부위의 운동량이 부족합니다.":   ""}
          
          {analyze.datasets[0].data.filter(it => 0 === it).length>4?
          "":  analyze.datasets[0].data.slice(0,4).reduce((totalval, curval)=>{
            return  totalval+ curval;
          },0) 
          >
           analyze.datasets[0].data.slice(4,8).reduce((totalval, curval)=>{
            return  totalval+ curval;
          },0)? <><div>상체운동을 위주로 열심히 하셨네요! 하체운동도 빼놓으면 안 되는것 잊지 마세요.</div> <div style={{textAlign:"center", paddingTop:"20px" , fontSize:"20px"}}>[스쿼트, 런지]</div></>: <><div>하체운동을 위주로 열심히 하셨네요! 상체운동도 빼놓으면 안 되는것 잊지 마세요.</div> <div style={{textAlign:"center", paddingTop:"20px" , fontSize:"20px"}}>  [팔굼혀펴기, 풀업]</div></>}
        
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

            <div className={styles.bmi}>
              <span style={{color: "rgb(201, 253, 97)"}}>체질량 지수(BMI)란 ? </span>
              BMI는 몸무게를 신장으로 나눈 수치로 저체중, 정상체중, 과체중, 혹은 비만 중 어디에 속하는지를 알려줍니다. 전문가들은 환자의 만성질환 위험을 가늠하기 위해 BMI를 사용하기도 합니다. 
              <br/><br/>
              <span style={{color: "rgb(201, 253, 97)"}}>주의 : </span>BMI는 신장과 체중만을 이용한 결과이기 때문에 체지방량을 대표하지는 않습니다. 그러므로 지방량, 근육량, 혹은 뼈 무게를 구분할 수 없습니다.</div>


            <div className={styles.result}>
              {!userInfo.isChk ? <div>고객님의 bmi수치는 <span>{userInfo.bmi}</span>  입니다. 이는 {

                userInfo.msg === "저체중" || userInfo.msg === "과체중" ? <span style={{ color: "#FF7493" }}>{userInfo.msg} 상태</span> : <span style={{ color: "#3399FF" }}>{userInfo.msg} 상태</span>} 입니다. </div> : null}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientMyLog;