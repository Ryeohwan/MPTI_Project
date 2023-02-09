import React, { useState, useEffect } from 'react';
import styles from './TrainerClientBody.module.css'
import CardItem3 from '../../../components/Card/CardItem3';
import ClientInfo from './ClientInfo';
import Pagination from '../../../components/Common/Pagination';
import axios from 'axios';

const TrainerClientBody = (props) => {
    const [searchValue, setSearchValue]=useState('') //검색어
    const [select, setSelect]=useState(1) //선택한 페이지
    const [targetClient,setTargetClient] = useState(undefined); //상세페이지 볼 클라이언트 id
    const data = [{id: 1, name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}, 
    {id: 2, name: '이예은', gender:'남', age:28, time:'14:00 - 15:00'}, 
    {id: 3, name: '윤동근', gender:'남', age:28, time:'14:00 - 15:00'}, 
    {id: 4, name: '서유진', gender:'남', age:28, time:'14:00 - 15:00'},
    {id: 5, name: '지선호', gender:'남', age:28, time:'14:00 - 15:00'},
    {id: 6, name: '안려환', gender:'남', age:28, time:'14:00 - 15:00'}
];

    useEffect(()=>{
    const data=JSON.stringify({id:0});
    console.log(data);
    axios.post("/api/user/userList/0", {id:1}).then(res=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })

    },[])


    
    
    return (
        targetClient?
            // 클릭한 고객 있으면 고객 상세페이지 띄우기
            <div>
                <div className={styles.container2}>
                    <ClientInfo {...data.find((item)=> item.id===targetClient)} setTargetClient={setTargetClient}/>
                </div>
            </div>
            :
            // 클릭한 고객 없으면 전체 리스트 띄우기
            <div>
                <input className={styles.search_bar} placeholder='고객 이름' onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} onKeyDown={(e)=>e.keyCode===13?setSearchValue(''):null}></input>
                <div className={styles.container}>
                    {data.filter((item)=> item.name.includes(searchValue)).map((item)=>
                        <CardItem3 key={item.id} className={styles.item} {...item} targetClient={targetClient} setTargetClient={setTargetClient}/>)
                    }
                </div>
                    <Pagination pages={3} select={select} setReviewPage={setSelect} />
            </div>

        )
}


export default TrainerClientBody