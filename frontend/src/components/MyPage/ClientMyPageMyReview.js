import React from 'react'
import styles from './ClientMyPageMyReview.module.css'
import {useState, useEffect} from 'react'
import axios from 'axios'
// import Pagination from '../Common/Pagination';

const ClientMyPageMyReview = () => {
    const [myreview, setMyReview] = useState([]);
    // const [reviewpage, setReviewPage] = useState(1);
    // const [showreview, setShowReview] = useState(myreview.slice((reviewpage-1)*3,(reviewpage-1)*3+3));
    // useEffect(()=>setShowReview(myreview.slice((reviewpage-1)*3, (reviewpage-1)*3+3)),
    // [reviewpage])
    axios.get('/api/business/opinion/review/list').then((res) => {
        console.log(res)
    });
    console.log(1)
    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await axios.get("/api/business/opinion/review/list");
    //         setMyReview(response.data);
    //       }
    //       if (!myreview) {
    //         fetchData();
    //       }
    //     }, []);
    console.log(myreview)
    return(
        <div className={styles.container} >
            <div className={styles.out_box}>
                <div className={styles.content_box}>
                    {myreview.map((review) => 
                    <div className={styles.in_box} key={review.id}>
                        <div className={styles.review_top}> <div className={styles.review_top_left}>{review.name}<div>{'⭐'.repeat(review.score)}</div> </div>  <div className={styles.review_top_right}>🗑</div>  </div>  
                        <div className={styles.review_email}>{review.email}</div>
                        <div className={styles.review_content}>{review.content}</div>
                    </div>
                    )}
                </div>
                {/* <Pagination pages={Math.ceil(myreview.length/3)} select={reviewpage} setReviewPage={setReviewPage}/> */}
            </div>
        </div>
    )

}


export default ClientMyPageMyReview