import orderStyles from './order-details.module.css';
import acceptedImage from '../../../images/done.png';
import React from "react";
import {useSelector} from "react-redux";
import Modal from '../../modal/modal';
import PropTypes from 'prop-types';


function OrderDetails ({ onClose }) {
    const orderNumber = useSelector(state => state.order.order.number)

    return (
        <>
            <Modal onClose={onClose} >
                <section className={`${orderStyles.detailSection}`}>
                    <p className="text text_type_digits-large  mb-8">{orderNumber}</p>
                    <p className="text text_type_main-medium mb-10"> идентификатор заказа</p>
                    <div className={orderStyles.accepted}>
                        <img src={acceptedImage} alt='Заказ принят' />
                    </div>
                    <p className="text text_type_main-default mt-5 mb-2"> Ваш заказ начали готовить </p>
                    <p className="text text_type_main-default text_color_inactive mb-5"> Дождитесь готовности на орбитальной станции </p>
                </section>
            </Modal>
        </>
    )
}


OrderDetails.propTypes = {
    onClose: PropTypes.func,
}

export default OrderDetails


