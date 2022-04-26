import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import sumOrderStyles from './sum-order.module.css';
import PropTypes from 'prop-types';



const SumOrder = ({ total, openModal }) => {
    return (
        <section className={` mt-10 ${sumOrderStyles.sectionOrder}`}>
            <div className={` ${sumOrderStyles.CurrencyIcon} mr-10`}>
                <span className="text text_type_digits-medium mr-2"> {total} </span>
                <CurrencyIcon type="primary"/>
            </div>
            <Button type="primary" size="large" onClick={openModal}>Оформить заказ</Button>
        </section>
    )
}


SumOrder.propTypes = {
    total: PropTypes.number.isRequired,
    openModal: PropTypes.func
}


export default SumOrder