import React from 'react'
import styles from './ClientMyPageMyReview.module.css'
import {useState, useEffect, memo} from 'react'
import axios from 'axios'
// import Pagination from '../Common/Pagination';

const ClientMyPageMyReview = ({reviews}) => {
    return(
        <div className={styles.container} >
            <div className={styles.out_box}>
                <div className={styles.content_box}>
                    {reviews.length?reviews.map((review) => 
                    <div className={styles.in_box} key={review.id}>
                        <div className={styles.review_top}> <div className={styles.review_top_left}>{review.writerName}<div>{'⭐'.repeat(review.star)}</div> </div>   </div>  
                        <div className={styles.review_email}>{review.createdAt.substr(0,10)}</div>
                        <div className={styles.review_content}>{review.memo}</div>
                    </div>
                    ):<div className={styles.no_review}>작성한 리뷰가 없습니다.</div>}
                </div>
            </div>
        </div>
    )

}


export default memo(ClientMyPageMyReview)