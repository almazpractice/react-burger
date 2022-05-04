import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({onClose}) => (
    <div
        className={styles.overlay}
        title="Закрыть модальное окно"
        onClick={onClose}
    />
);

ModalOverlay.propTypes = {
    onClose: PropTypes.func
}