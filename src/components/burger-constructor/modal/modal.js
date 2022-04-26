import modalStyles from './modal.module.css'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';


function Modal ({children, header, isVisible, onClose}) {
    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        const close = (e) => {
          if(e.key === "Escape" || e.key === "Esc"){
            onClose();
          }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    },[onClose])
    
    const closeModal = () => {
        onClose();
    }
    const handleClick = (e) => {
        e.stopPropagation();
    } 
    
    return ReactDOM.createPortal(
        <> {isVisible && 
            <>
            <div className={`${modalStyles.modal} p-10`}>
              <div className={modalStyles.modalHeader} data-test="modal-header" onClick={handleClick}>
                {header && (<p className={`${modalStyles.modalTitle} text text_type_main-large`}>{header}</p>)}
                <CloseIcon
                  type="primary"
                  onClick={closeModal}
                />
              </div>
              <div className={modalStyles.modalContent}>
                {children}
              </div>
            </div>
            <ModalOverlay onClose={closeModal}/>
            </>
        }
      </>,
        modalRoot
      );
}

Modal.propTypes = {
    children: PropTypes.node,
    header: PropTypes.string,
    isVisible: PropTypes.bool,
    onClose: PropTypes.func
}
export default Modal