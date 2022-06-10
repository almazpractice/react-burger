import styles from './sum-order.module.css';
import React from "react";
import { useSelector } from "react-redux";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const SumOrder = ({ handleModal }) => {
    const data = useSelector(state => state.ingredients.cart)
    const loading = useSelector(state => state.order.loading)
    const totalPrice = useSelector(state => state.ingredients.totalPrice)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const location = useLocation();

    const disabled = !(data && data.filter(x => x.type === 'bun').length
                    && !loading && data.filter(x => x.type !== 'bun').length)

    return (
        <>
            <section className={` mt-10 ${styles.sectionOrder}`}>
                <div className={` ${styles.currencyIcon} mr-10`}>
                    <span className="text text_type_digits-medium mr-2"> {totalPrice} </span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Link to={ isAuthenticated ? "" : {
                    pathname: "/login",
                    state: { from: location }
                }}>
                    <Button
                        type="primary"
                        size="large"
                        onClick={isAuthenticated ? handleModal : void 0}
                        disabled={disabled}>
                        {loading ? "Загрузка..." : "Оформить заказ"}
                    </Button>
                </Link>
            </section>
                <div className={styles.authLabel}>
                    {!isAuthenticated &&
                    <span className="text text_type_main-small text_color_inactive mr-2 mt-2"> Для заказа необходимо пройти авторизацию </span>}
                </div>
        </>
    )
}

SumOrder.propTypes = {
    handleModal: PropTypes.func,
}

export default SumOrder