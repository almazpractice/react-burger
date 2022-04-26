import Modal from '../modal/modal';
import orderStyles from './order-details.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import acceptedImage from '../../../images/done.png';
import PropTypes from 'prop-types';


function OrderDetails ({order, onClose, isVisible}) {
    return (
        <>
            <Modal onClose={onClose} isVisible={isVisible} >
                <section className={`${orderStyles.detailSection}`}>
                    <p className="text text_type_digits-large  mb-8">{order}</p>
                    <p className="text text_type_main-medium mb-15"> идентификатор заказа</p>
                    <div className={orderStyles.accepted}>
                        <img src={acceptedImage} alt='Заказ принят' />
                    </div>
                    <p className="text text_type_main-default mt-15 mb-2"> Ваш заказ начали готовить </p>
                    <p className="text text_type_main-default text_color_inactive mb-20"> Дождитесь готовности на орбитальной станции </p>
                </section>
            </Modal>
            <ModalOverlay onClose={onClose} isVisible={isVisible}/>
        </>
    )
}


OrderDetails.propTypes = {
    order: PropTypes.number.isRequired,
    onClose: PropTypes.func,
    isVisible: PropTypes.bool
}

export default OrderDetails


