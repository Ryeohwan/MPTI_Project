import styles from './Pagination.module.css'

export default function Pagination(props) {
    // pages는 총 리뷰 페이지(1페이지에 3개), select는 선택한 페이지
    const pages = props.pages
    const select = props.select
    const pageSelect = props.setReviewPage
    //startpage는 3페이지씩 나눴을때 몇번째 숫자부터 시작할지 저장
    const startpage= parseInt((select-1)/3)*3+1
    //showpage는 보여줄 페이지 목록의 수 1,2,3 페이지 가져오기
    const showpage = [startpage, startpage+1, startpage+2]
    return(
        <div className={styles.box}>
            {(select>1)? <div className={`${styles.btn} ${styles.btn_step}`} onClick={(e)=>pageSelect(1)}>&lt;&lt;</div>:<div className={styles.btn}></div>}
            {(select>1)? <div className={`${styles.btn} ${styles.btn_step}`} onClick={(e)=>pageSelect(select-1)}>&lt;</div>:<div className={styles.btn}></div>}
            {showpage.map((page) => (page<=pages)?
            (page===select)?<div key ={page} className={`${styles.btn} ${styles.btn_select}`} onClick={()=>pageSelect(page)}>{page}</div>:<div key ={page} className={`${styles.btn} ${styles.btn_num}`} onClick={()=>pageSelect(page)}>{page}</div>
             : 
             null)}
            {(select<pages)?<div className={`${styles.btn} ${styles.btn_step}`} onClick={(e)=>pageSelect(select+1)}>&gt;</div >:<div className={styles.btn}></div>}
            {(select<pages)?<div className={`${styles.btn} ${styles.btn_step}`} onClick={(e)=>pageSelect(pages)}>&gt;&gt;</div >:<div className={styles.btn}></div>}
        </div>
    )
    
}