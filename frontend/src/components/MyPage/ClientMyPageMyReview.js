import styles from './ClientMyPageMyReview.module.css'
import {useState, useEffect} from 'react'
import Pagination from '../Common/Pagination';

const ClientMyPageMyReview = () => {
    const [myreview, setMyReview] = useState([{id:1, name:'정원철', email:'wonchool@naver.com', score:3, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:2, name:'정원철', email:'wonchool@naver.com', score:5, content: ' linebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktest 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:3, name:'정원철', email:'wonchool@naver.com', score:4, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:4, name:'정원철', email:'wonchool@naver.com', score:3, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:5, name:'정원철', email:'wonchool@naver.com', score:3, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:6, name:'정원철', email:'wonchool@naver.com', score:3, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:7, name:'정원철', email:'wonchool@naver.com', score:3, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:8, name:'정원철', email:'wonchool@naver.com', score:3, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'}]);
    const [reviewpage, setReviewPage] = useState(1);
    const [showreview, setShowReview] = useState(myreview.slice((reviewpage-1)*3,(reviewpage-1)*3+3));
    useEffect(()=>setShowReview(myreview.slice((reviewpage-1)*3, (reviewpage-1)*3+3)),
    [reviewpage])

    return(
        <div className={styles.container} >
            <div className={styles.out_box}>
                <div className={styles.content_box}>
                    {showreview.map((review) => 
                    <div className={styles.in_box} key={review.id}>
                        <div className={styles.review_top}> <div className={styles.review_top_left}>{review.name}<div>{'⭐'.repeat(review.score)}</div> </div>  <div className={styles.review_top_right}>🗑</div>  </div>  
                        <div className={styles.review_email}>{review.email}</div>
                        <div className={styles.review_content}>{review.content}</div>
                    </div>
                    )}
                </div>
                <Pagination pages={Math.ceil(myreview.length/3)} select={reviewpage} setReviewPage={setReviewPage}/>
            </div>
        </div>
    )

}


export default ClientMyPageMyReview