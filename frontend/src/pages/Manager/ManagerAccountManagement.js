import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./ManagerAccountManagement.module.css";
import { useDispatch } from 'react-redux';
import { accountList, accountDelete } from "../../store/admin";
import './Paging.css';
import Pagination from "react-js-pagination";
const ManagerAccountManagement = () => {

  const disapatch = useDispatch();
  const [account, setAccount] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage]= useState(0);
  const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
  };
  useEffect(()=>{

    disapatch(accountList()).then((res)=>{
      console.log(res.content);
      setAccount(res.content);
    })
  }, [])


  const deleteAccountHandler = (data) =>{
       disapatch(accountDelete(data));
    }
  return (
    <>
      <div className={styles.info_content_box}>
        <div className={styles.content_title}>
          계정관리 <span className={styles.square}>&#9660;</span>
        </div>
        <span>MPTI 고객님들의 소중한 계정정보를 확인하고 관리하세요.</span>
        <div className={styles.content_content}>
          <ul className={styles.content_list}>
            {
              account.map((it)=>{
                return(
                  <li key={it.email}  className={styles.content_item}>
                  <div className={styles.item_info_box}>
                    <div className={styles.item_info}>
                      <div>성명:{it.name} </div> |<div>E-MAIL:{it.email} </div> |
                      <div>age :{it.age} </div>
                    </div>
                    <div className={styles.item_btn}>
                      <button className={styles.btn_negative} onClick={()=>deleteAccountHandler({email:it.email})}>삭제</button>
                    </div>
                  </div>
                </li>
                )
              })    
            }
      
          </ul>
        </div>
        <div className={styles.pagenation}>
          <Pagination
      activePage={page}
      itemsCountPerPage={8}
      totalItemsCount={totalPage}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
        </div>
      </div>
    </>
  );
};

export default ManagerAccountManagement;
