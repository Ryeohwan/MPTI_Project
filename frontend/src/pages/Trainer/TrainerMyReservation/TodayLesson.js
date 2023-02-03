import styles from './TodayLesson.module.css'
import ScheduleCardItem2 from '../../../components/Card/ScheduleCardItem2';


const TrainerMyClient = () => {
    return (
        <div className={styles.container}>
            <ScheduleCardItem2 className={styles.item}/>
            <ScheduleCardItem2/>
            <ScheduleCardItem2/>
            <div className={styles.item}>하이</div>
            <ScheduleCardItem2/>
            <div>하이</div>
            <div>하이</div>
        </div>
    );
};

export default TrainerMyClient;