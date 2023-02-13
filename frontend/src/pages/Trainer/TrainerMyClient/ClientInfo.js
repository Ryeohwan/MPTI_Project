import React, {useState} from 'react';
import styles from './ClientInfo.module.css'
import ClientProfile from './ClientProfile';
import ClientLog from './ClientLog';
import ClientLogCard from './ClientLogCard';
import Pagination from "react-js-pagination";
import { useEffect } from 'react';
import axios from 'axios';


const ClientInfo = (props) => {    
    const setTargetClient= props.setTargetClient
    const [logList, setLogList]= useState([]);
    
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage]= useState(0);
    const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
  };
    useEffect(()=>{
        axios.post(`/api/user/pt/status/${page-1}`, {id:1}).then(res=>{
            console.log(res.data, "sss");
            setLogList(res.data.content);
            setTotalPage(res.data.totalElements);
        })
    },[page])
    return (
        <div className={styles.container}>
            <div className={styles.flex_row}>
                <ClientProfile name={props.name} gender={props.gender} age={props.age} image={props.s3Url} />
                <ClientLog email={props.email}/>

            </div>
            <div className={styles.grid_2_row}>
                {logList.map((it, index)=>{
                    return(<ClientLogCard key={index} data={it}/>
                    )
                })}

            </div>
            
            <div className={styles.pagenation}>
          <Pagination
            activePage={page}
            itemsCountPerPage={4}
            totalItemsCount={totalPage}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            onChange={handlePageChange}
          />
        </div>
                
            <button className={styles.back_btn} onClick={() => setTargetClient(undefined)}>뒤로가기</button>
        </div>
    )
}


export default ClientInfo