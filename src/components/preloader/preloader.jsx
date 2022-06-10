import styles from './preloader.module.css'
import preloaderImg from "../../images/preloader.gif"

export function Preloader() {
    return (
        <section className={styles.section}>
            <img src={preloaderImg} alt='preloader'/>
        </section>
    )
}