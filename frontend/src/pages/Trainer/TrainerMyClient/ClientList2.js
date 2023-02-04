import React from 'react';
import styles from './ClientList2.module.css'
import CardItem3 from '../../../components/Card/CardItem3';


const ClientList2 = (props) => {
    const search = props.searchValue;
    const data = [{name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}, {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}, {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}, {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}, {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}, {name: '정원철', gender:'남', age:28, time:'14:00 - 15:00'}];


    return (
        <div className={styles.container}>
            {data.filter((item)=> item.name.includes(search)).map((item)=>
                <CardItem3 className={styles.item} {...data}/>
            )}
        </div>
    )
}


export default ClientList2