import styles from './form-page.module.css'
import AppHeader from "../components/app-header/app-header";

export function FormPage({ children }) {
    return (
        <>
            <AppHeader />
            <main className={styles.wrapper}>
                <section className={styles.section}>
                    { children }
                </section>
            </main>
        </>
    )
}