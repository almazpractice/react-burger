import styles from './form-page.module.css'
import AppHeader from "../components/app-header/app-header";
import PropTypes from "prop-types";

export function WrapperPage({ children }) {
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

WrapperPage.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node
    ]).isRequired
}