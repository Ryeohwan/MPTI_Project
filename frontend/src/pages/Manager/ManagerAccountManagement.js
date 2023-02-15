import React, { useEffect, useState } from "react";
import styles from "./ManagerAccountManagement.module.css";
import { useDispatch } from "react-redux";
import { accountList, accountDelete } from "../../store/admin";
import "./Paging.css";
import Pagination from "react-js-pagination";
import ReportModalContainer from "./Modal/ReportModalContainer";
import AccountModal from "./Modal/AccountModal";
import { useNavigate } from 'react-router-dom';
const ManagerAccountManagement = () => {
  const disapatch = useDispatch();
  const navigate= useNavigate();
  const [account, setAccount] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const handlePageChange = (page) => {
    console.log(page);
    setPage(page);
  };
  
  useEffect(() => {
    disapatch(accountList(page - 1)).then((res) => {
      console.log(res.data);
      setTotalPage(res.data.totalElements);
      setAccount(res.data.content);
    });
  }, [page]);

  const deleteAccountHandler = (data) => {
    if(window.confirm("정말로 삭제하시겠습니까?")){
      disapatch(accountDelete(data));
      window.location.reload();
    }
  };



  const [modal, setModal] = useState({
    show: false,
    name: "",
    email: "",
    birth: "",
    gender:"",
    phone:"",
    image: "",
    id:""
  });

  const handleOpenModal = (name, email ,birth, gender,phone,image,id) => {
    setModal({
      show: true,
      name,
      email,
      birth,
      gender,
      phone,
      image,
      id,
    });
  };

  const handleCloseModal = () => {
    console.log("sss");
    setModal({
      show: false,
      name: "",
      email: "",
      birth: "",
      gender:"",
      phone: "",
      image:"",
      id: "",
    });
  };

  return (
    <>
      <div className={styles.info_content_box}>
        <div className={styles.content_title}>
          계정관리 <span className={styles.square}>&#9660;</span>
        </div>
        <span>MPTI 고객님들의 소중한 계정정보를 확인하고 관리하세요.</span>
        <div className={styles.content_content}>
          <ul className={styles.content_list}>
            {account.map((it,index) => {
              return (
                <li key={it.email} className={styles.content_item}>
                  <div className={styles.item_info_box}
                 >
                    <div className={styles.item_info}
                     onClick={() =>
                      handleOpenModal(it.name,it.email, it.birth,it.gender, it.phone, it.s3Url, index)
                    }>
                      <img className={styles.image} src="/star.png"/>
                      <div>{(8*(page-1))+index+1}</div>
                      <div>성명: {it.name} </div>
                      <div>E-MAIL:{it.email} </div>
                      <div>age :{it.age} </div>
                    </div>
                    <div className={styles.item_btn}>
                      <button
                        className={styles.btn_negative}
                        onClick={() =>
                          deleteAccountHandler({ email: it.email })
                        }
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  {modal.show && (
                    <ReportModalContainer onClose={handleCloseModal}>
                      <AccountModal
                        name={modal.name}
                        email={modal.email}
                        birth={modal.birth}
                        gender={modal.gender}
                        phone={modal.phone}
                        image={modal.image}
                        id={modal.id}
                        
                        onClose={handleCloseModal}
                      />
                    </ReportModalContainer>
                  )}
                </li>
              );
            })}
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
