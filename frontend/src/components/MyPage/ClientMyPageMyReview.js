import React from 'react'
import styles from './ClientMyPageMyReview.module.css'
import {useState, useEffect, memo} from 'react'
import axios from 'axios'
// import Pagination from '../Common/Pagination';

const ClientMyPageMyReview = ({reviews}) => {
    // const [reviewpage, setReviewPage] = useState(1);
    // const [showreview, setShowReview] = useState(myreview.slice((reviewpage-1)*3,(reviewpage-1)*3+3));
    // useEffect(()=>setShowReview(myreview.slice((reviewpage-1)*3, (reviewpage-1)*3+3)),
    // [reviewpage])

    return(
        <div className={styles.container} >
            <div className={styles.out_box}>
                <div className={styles.content_box}>
                    {reviews && reviews.map((review) => 
                    <div className={styles.in_box} key={review.id}>
                        <div className={styles.review_top}> <div className={styles.review_top_left}>{review.writerName}<div>{'⭐'.repeat(review.star)}</div> </div>  <div className={styles.review_top_right}>🗑</div>  </div>  
                        <div className={styles.review_email}>{review.createdAt.substr(0,10)}</div>
                        <div className={styles.review_content}>{review.memo}</div>
                    </div>
                    )}
                </div>
                {/* <Pagination pages={Math.ceil(reviews.length/3)} select={reviewpage} setReviewPage={setReviewPage}/> */}
            </div>
        </div>
    )

}


export default memo(ClientMyPageMyReview)