import React, {useState} from 'react';
import styles from './ClientInfo.module.css'
import ClientProfile from './ClientProfile';
import ClientLog from './ClientLog';
import ClientLogCard from './ClientLogCard';
import Pagination from '../../../components/Common/Pagination'

const ClientInfo = (props) => {

    const clientId = props.id
    const clientName = props.name
    const clientGender = props.gender
    const clientAge = props.age
    const clientTime = props.time
    const setTargetClient= props.setTargetClient
    const [select, setSelect] = useState(1)
    return (
        <div className={styles.container}>
            <div className={styles.flex_row}>
                <ClientProfile/>
                <ClientLog id={clientId}/>
            </div>
            <div className={styles.grid_2_row}>
                <ClientLogCard/>
                <ClientLogCard/>
                <ClientLogCard/>
                <ClientLogCard/>
            </div>
                <Pagination  pages={3} select={select} setReviewPage={setSelect} />

            <button className={styles.back_btn} onClick={() => setTargetClient(undefined)}>뒤로가기</button>
        </div>
    )
}


export default ClientInfo