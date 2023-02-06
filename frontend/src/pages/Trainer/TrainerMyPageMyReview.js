import styles from './TrainerMyPageMyReview.module.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import React from 'react'

const request_url = '/api/business/opinion/review/list'

const TrainerMyPageMyReview=async ()=>{
  const [reviews, setReviews] =await useState(await axios.get(request_url).then((data)=> data.data))
  const deleteReview = () => {
    console.log(1)
  }

  return(
    <div className={styles.container}>
      <div className={styles.content_title}>내 고객리뷰</div>
      <div className={styles.out_box}>
        <div className={styles.content_box}>
          {reviews.map(review => 
            <div className={styles.in_box} key={review.id}>
              <div className={styles.review_top}>
                <div className={styles.review_top_left}>
                  {review.writerId}
                  <div>{'⭐'.repeat(review.star)}</div>
                </div>  
                <div 
                  className={styles.review_top_right}
                  onClick={() => deleteReview(review.id)}
                >
                  🗑
                </div>  
              </div>  
              <div className={styles.review_email}>{review.createdAt}</div>
              <div className={styles.review_content}>{review.memo}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
    
export default React.memo(TrainerMyPageMyReview) ;