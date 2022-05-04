import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import sumOrderStyles from './sum-order.module.css';
import PropTypes from 'prop-types';
import React from "react";
import {TotalPriceContext} from "../../../services/burger-constructor-context";

const SumOrder = ({ loading, handleCLick }) => {
    const { totalPriceState } = React.useContext(TotalPriceContext);

    return (
        <section className={` mt-10 ${sumOrderStyles.sectionOrder}`}>
            <div className={` ${sumOrderStyles.currencyIcon} mr-10`}>
                <span className="text text_type_digits-medium mr-2"> {totalPriceState.totalPrice} </span>
                <CurrencyIcon type="primary"/>
            </div>
            { !loading && <Button type="primary" size="large" onClick={handleCLick}>Оформить заказ</Button> }
        </section>
    )
}


SumOrder.propTypes = {
    loading: PropTypes.bool,
    handleCLick: PropTypes.func
}


export default SumOrder