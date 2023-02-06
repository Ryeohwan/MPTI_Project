import React, { useEffect, useState } from 'react';
import styles from './TrainerMyClient.module.css';
import TopTitle from '../../components/Common/TopTitle';
import ClientInfo from './TrainerMyClient/ClientInfo';
import ClientList2 from './TrainerMyClient/ClientList2';
import Pagination from '../../components/Common/Pagination'
const TrainerMyClient = () => {
    const [searchValue, setSearchValue]=useState('')
    const [searchResults, setSearchResults]=useState([])
    const data = [{name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}, {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}, {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}, {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}];
    useEffect(()=>{
        const sample = data.filter((item) => item.name.includes(searchValue))
    },[searchValue])
    const [select, setSelect]=useState(1)
    return (
        <div className={styles.TrainerMyClient}>
            <TopTitle title='고객 관리▼' content='고객을 관리해 주세요.'/>
            <div className={styles.body_box}>
                <input className={styles.search_bar} placeholder='고객 이름' onChange={(e)=>setSearchValue(e.target.value)} value={searchValue} onKeyDown={(e)=>e.keyCode===13?setSearchValue(''):null}></input>
                <ClientList2 searchValue={searchValue}/>
                <Pagination pages={3} select={select} setReviewPage={setSelect} />


            </div>
        </div>
    );
};

export default TrainerMyClient;