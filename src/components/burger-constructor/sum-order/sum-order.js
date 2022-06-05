import sumOrderStyles from './sum-order.module.css';
import React from "react";
import { useSelector } from "react-redux";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const SumOrder = ({handleModal}) => {
    const data = useSelector(state => state.ingredients.cart)
    const loading = useSelector(state => state.order.loading)
    const totalPrice = useSelector(state => state.ingredients.totalPrice)


    return (
        <section className={` mt-10 ${sumOrderStyles.sectionOrder}`}>
            <div className={` ${sumOrderStyles.currencyIcon} mr-10`}>
                <span className="text text_type_digits-medium mr-2"> {totalPrice} </span>
                <CurrencyIcon type="primary"/>
            </div>
             <Button
                 type="primary"
                 size="large"
                 onClick={handleModal}
                 disabled={!(data && data.filter(x => x.type === 'bun').length && !loading && data.filter(x => x.type !== 'bun').length)}>
                 { loading ? "Загрузка..." : "Оформить заказ"}
             </Button>
        </section>
    )
}

SumOrder.propTypes = {
    handleModal: PropTypes.func,
}

export default SumOrder