import styles from './TrainerMyPageMyReview.module.css'


export default function TrainerMyPageMyReview(){

    const showreview = [{id:1, name:'정원철', email:'wonchool@naver.com', score:3, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:2, name:'정원철', email:'wonchool@naver.com', score:5, content: ' linebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktestlinebreaktest 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:3, name:'정원철', email:'wonchool@naver.com', score:4, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:4, name:'정원철', email:'wonchool@naver.com', score:3, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'},
    {id:5, name:'정원철', email:'wonchool@naver.com', score:3, content: '운동 자세를 자세히 가르쳐 주시고 지금 제 상태에 필요한 운동이 무엇인지 콕 찝어 알려주십니다. 대만족!'}]
    return(
        <div className={styles.MyPage_body}>
            <div className={styles.content_title}>내 개인정보</div>
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
            </div>
        </div>
    )
}