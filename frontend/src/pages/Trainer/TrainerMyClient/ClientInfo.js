import React, {useState} from 'react';
import styles from './ClientInfo.module.css'
import ClientProfile from './ClientProfile';
import ClientLog from './ClientLog';
import ClientLogCard from './ClientLogCard';
import Pagination from "react-js-pagination";
import { useEffect } from 'react';
import axios from 'axios';
import TrainerReportModal from '../../Manager/Modal/TrainerReportModal';
import ReportModalContainer from "../../Manager/Modal/ReportModalContainer";
import { useSelector } from 'react-redux';
const ClientInfo = (props) => {    
    const setTargetClient= props.setTargetClient
    const [logList, setLogList]= useState([]);
    const  auth = useSelector((state) => state.auth);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage]= useState(0);
    console.log(props, "ss");
    const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
  };
    useEffect(()=>{
        axios.post(`/api/user/pt/status/${page-1}`, {id:auth.id}).then(res=>{
            console.log(res.data);
            setLogList(res.data.content);
            setTotalPage(res.data.totalElements);
        }).catch((err) => {
          console.log(err)
        })
    },[page])
  console.log(logList)

      // 신고 모달관련
  const [modal, setModal] = useState({
    show: false,
    writerName: "",
    targetName: "",
    writerId: "",
    targetId:"",
  });

  const handleOpenModal = (writerName, targetName, writerId, targetId ) => {
    setModal({
      show: true,
      writerName,
      targetName,
      writerId,
      targetId,
    });
  };

  const handleCloseModal = () => {
    setModal({
      show: false,
      writerName: "",
      targetName: "",
      writerId: "",
      targetId:"",
      
    });
  };


    return (
        <div className={styles.container}>
            <div className={styles.flex_row}>
                <ClientProfile name={props.name} gender={props.gender} age={props.age} image={props.s3Url} email={props.email} id={props.id} role={props.role} />
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
            <div className={styles.trainer_report} onClick={() =>
                handleOpenModal(auth.name, props.name, auth.id, props.id)
            } >
                <img src="/reportbell.png" />신고
           </div>

           {modal.show && (
                    <ReportModalContainer onClose={handleCloseModal}>
                      <TrainerReportModal
                        writerName={modal.writerName}
                        targetName={modal.targetName}
                        writerId ={modal.writerId}
                        targetId={modal.targetId}
                        onClose={handleCloseModal}
                      />
                    </ReportModalContainer>
                  )}
        </div>
    )
}


export default ClientInfo