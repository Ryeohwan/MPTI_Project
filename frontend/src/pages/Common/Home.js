import React, { useEffect, useState } from 'react';
import styles from "./Home.module.css"
import TrainerImg from "./../../assets/img/trainer.PNG"
import axios from 'axios';

const dummyData = [
    {
        id: 1,
        name: "정원철",
        rate:  "4.7",
        introduce: "정말 잘할 자신이 있습니다.1"
    },
    {
        id: 2,
        name: "서유진",
        rate:  "4.5",
        introduce: "정말 잘할 자신이 있습니다.2"
    },
    {
        id: 3,
        name: "윤동근",
        rate:  "4.1",
        introduce: "정말 잘할 자신이 있습니다.3"
    },
    {
        id: 4,
        name: "지선호",
        rate:  "4.2",
        introduce: "정말 잘할 자신ddddddd"
    }

]

const dummyData2 = [
    {
        id: 1,
        name: "정원철",
        rate:  "4.7",
        introduce: "정말 잘할 자신이 있습니다.1"
    },
    {
        id: 2,
        name: "서유진",
        rate:  "4.5",
        introduce: "정말 잘할 자신이 있습니다.2"
    },
    {
        id: 3,
        name: "윤동근",
        rate:  "4.1",
        introduce: "정말 잘할 자신이 있습니다.3"
    },
    {
        id: 4,
        name: "지선호",
        rate:  "4.2",
        introduce: "정말 잘할 자신ddddddd"
    }

]



const Home = () => {

    const [trainerIntrocuce, setTraineIntroduce ]=useState("");
    const [review, setReview ]=useState("");
    


    useEffect(()=>{
        axios.get("http://localhost:8080/trainer/list").then((res)=>{
            const trainerIntrocuces=res.data;
            setTraineIntroduce(trainerIntrocuces);
        }).catch((err)=>{
            console.log(err)
        })

        axios.get("http://localhost:8080/trainer/review").then((res)=>{
            const reviews=res.data;
            setReview(reviews)
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    
    return (
        <div className={styles.Home}>
           <div className={styles.home_header}>이달의 트레이너</div>
           <div className={styles.home_comment}>MPTI를 빛낸 우수한 강사진을 확인하세요!</div>
            {/* 트레이너 리스트 부분 - 분리예정 */}
     
            <div className={styles.home_trainer_box}>

                <ul className={styles.home_trainer_list}>
                  
                  {dummyData.map( (it)=>{
                    return (
                        <li key={it.id} className={styles.home_trainer_item}>
                            <div className={styles.home_trainer_img}><img src={TrainerImg}/></div>
                                <div className={styles.home_trainer_info}>
                                    <div className={styles.home_trainer_name}>{it.name} 트레이너</div>
                                    <div className={styles.home_trainer_rate}><span>★★★★★</span> {it.rate}점 </div>
                                    <div className={styles.home_trainer_introduce}>{it.introduce}</div>
                                </div>
                      </li>
                    )
                  })}
                </ul>
                
            </div>

            <div className={styles.home_title}>MPTI의 리뷰</div> 
            <div className={styles.home_comment}>MPTI 고객님들의 생생한 후기를 확인해보세요!</div>
 

            <div className={styles.home_review_box}>

                <ul className={styles.home_review_list}>
  
            {dummyData.map( (it)=>{
                return (
                    <li key={it.id} className={styles.home_review_item}>
                        
                        
                        <div className={styles.home_review_top}>
                            <div className={styles.home_review_img}><img src={TrainerImg}/></div>
                            <div className={styles.home_review_name}>정원철 트레이너</div>    
                        </div>

                        <div className={styles.home_review_mid}>
                            <div className={styles.home_review_cusname}>정원철</div>
                            <div className={styles.home_review_start}>★★★★★</div>    
                        </div>

                        <div className={styles.home_review_bottom}>
                            선생님들을 만나고 제인생이 바뀌었읍니다.
                        </div>
                            
                            
                            {/* <img src={TrainerImg}/></div>
                        <div className={styles.home_trainer_info}>
                            <div>{it.name}</div>
                            <div>{it.rate}</div>
                            <div>{it.introduce}</div>
                        </div> */}
                    </li>
    )
  })}
</ul>

</div>
 
        </div>
    );
};

export default Home;