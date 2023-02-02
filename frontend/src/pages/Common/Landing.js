import styles from './Landing.module.css'


const Landing = () => {

    return(
        <div>
            <div className={styles.hero_section}>
                <h1>eat.</h1>
                <h1>sleep.</h1>
                <h1>ski.</h1>
                <h1>repeat.</h1>
                <p>Need we say more? <br/>Come to <strong>Queenstown</strong> and have the time of your life.</p>

                <button>See our deals</button>
                </div>

                <div className={styles.menu_section}>
                <p>Queenstown<span>Life</span></p>
                <ul>
                    <li>About</li>
                    <li>Deals</li>
                    <li>Blog</li>
                    <li>Contact</li>
            </ul>
            </div>
        </div>
    )

}



export default Landing