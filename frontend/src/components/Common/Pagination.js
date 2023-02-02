import styles from './Pagination.module.css'

export default function Pagination(props) {
    // pages는 총 리뷰 페이지(1페이지에 3개), select는 선택한 페이지
    console.log(props.pages, props.select)
    //startpage는 3페이지씩 나눴을때 몇번째 숫자부터 시작할지 저장
    const startpage= parseInt((props.select-1)/3)*3+1
    //showpage는 보여줄 페이지 목록의 수 1,2,3 페이지 가져오기
    const showpage = [startpage, startpage+1, startpage+2]
    return(
        <div className={styles.box}>
            {(props.select>1)? <div className={`${styles.btn} ${styles.btn_step}`} onClick={(e)=>props.setReviewPage(1)}>&lt;&lt;</div>:<div className={styles.btn}></div>}
            {(props.select>1)? <div className={`${styles.btn} ${styles.btn_step}`} onClick={(e)=>props.setReviewPage(props.select-1)}>&lt;</div>:<div className={styles.btn}></div>}
            {showpage.map((page) => (page<=props.pages)?
            (page===props.select)?<div className={`${styles.btn} ${styles.btn_select}`} onClick={()=>props.setReviewPage(page)}>{page}</div>:<div className={`${styles.btn} ${styles.btn_num}`} onClick={()=>props.setReviewPage(page)}>{page}</div>
             : 
             null)}
            {(props.select<props.pages)?<div className={`${styles.btn} ${styles.btn_step}`} onClick={(e)=>props.setReviewPage(props.select+1)}>&gt;</div >:<div className={styles.btn}></div>}
            {(props.select<props.pages)?<div className={`${styles.btn} ${styles.btn_step}`} onClick={(e)=>props.setReviewPage(props.pages)}>&gt;&gt;</div >:<div className={styles.btn}></div>}
        </div>
    )
    
}

{/* <div className={`${styles.btn} ${styles.btn_select}`} onClick={(e)=>props.setReviewPage(e.target.innerText-1)}>{showpage[0]}</div>
<div className={`${styles.btn} ${styles.btn_num}`} onClick={(e)=>props.setReviewPage(e.target.innerText-1)}>{showpage[1]}</div>
<div className={`${styles.btn} ${styles.btn_num}`} onClick={(e)=>props.setReviewPage(e.target.innerText-1)}>{showpage[2]}</div>
<div className={`${styles.btn} ${styles.btn_step}`} onClick={(e)=>props.setReviewPage(props.select+1)}>&gt;</div> */}