import Modal from '../../modal/modal';
import orderStyles from './order-details.module.css';
import { ModalOverlay } from '../../modal-overlay/modal-overlay';
import acceptedImage from '../../../images/done.png';
import PropTypes from 'prop-types';
import React from "react";


function OrderDetails ({order, onClose }) {
    return (
        <>
            <Modal onClose={onClose} >
                <section className={`${orderStyles.detailSection}`}>
                    <p className="text text_type_digits-large  mb-8">{order}</p>
                    <p className="text text_type_main-medium mb-10"> идентификатор заказа</p>
                    <div className={orderStyles.accepted}>
                        <img src={acceptedImage} alt='Заказ принят' />
                    </div>
                    <p className="text text_type_main-default mt-5 mb-2"> Ваш заказ начали готовить </p>
                    <p className="text text_type_main-default text_color_inactive mb-5"> Дождитесь готовности на орбитальной станции </p>
                </section>
            </Modal>
            <ModalOverlay onClose={onClose}/>
        </>
    )
}


OrderDetails.propTypes = {
    order: PropTypes.number.isRequired,
    onClose: PropTypes.func,
}

export default OrderDetails


