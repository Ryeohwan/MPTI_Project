import React from 'react';
import styles from './ClientList.module.css'
import CardItem3 from '../../../components/Card/CardItem3';


const ClientList = (props) => {
    const search = props.search;
    const data = {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'};


    return (
        <div className={styles.container}>
            <CardItem3 className={styles.item} {...data} />
            <CardItem3 className={styles.item} {...data} />
            <CardItem3 className={styles.item} {...data} />
            <CardItem3 className={styles.item} {...data} />
            <CardItem3 className={styles.item} {...data} />
            <CardItem3 className={styles.item} {...data} />
            <CardItem3 className={styles.item} {...data} />
        </div>
    )
}


export default ClientList