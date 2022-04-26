import Modal from '../modal/modal';
import PropertiesText from './properties-text/properties-text';
import detailsStyles from './ingredient-details.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import PropTypes from 'prop-types';



function IngredientDetails ({ingredient, onClose, isVisible}) {

    return (
        <>
            <Modal onClose={onClose} isVisible={isVisible} header={"Детали ингредиента"}>
                <section className={`${detailsStyles.detailSection} p-10 pb-5`}>
                    <img src={ingredient.image_large} alt={ingredient.name} />
                    <p className="text text_type_main-medium mt-3 mb-8"> {ingredient.name}</p>
                    <div className={detailsStyles.propertiesWrapper}>
                        <PropertiesText name="Каллории, ккал" value={ingredient.calories} />
                        <PropertiesText name={"Белки, г"} value={ingredient.proteins} />
                        <PropertiesText name={"Жиры, г"} value={ingredient.fat} />
                        <PropertiesText name={"Углеводы, г"} value={ingredient.carbohydrates} />
                    </div>
                </section>
            </Modal>
            <ModalOverlay onClose={onClose} isVisible={isVisible}/>
        </>
    )
}


IngredientDetails.propTypes = {
    ingredient: PropTypes.object,
    onClose: PropTypes.func,
    isVisible: PropTypes.bool
}

export default IngredientDetails
