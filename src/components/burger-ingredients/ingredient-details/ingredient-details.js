import detailsStyles from './ingredient-details.module.css';
import {ingredientType} from "../../../utils/data-type";
import Modal from '../../modal/modal';
import { ModalOverlay } from '../../modal-overlay/modal-overlay';
import PropertiesText from './properties-text/properties-text';
import PropTypes from 'prop-types';



function IngredientDetails ({ingredient, onClose}) {

    return (
        <>
            <Modal onClose={onClose} header={"Детали ингредиента"}>
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
            <ModalOverlay onClose={onClose}/>
        </>
    )
}


IngredientDetails.propTypes = {
    ingredient: ingredientType.isRequired,
    onClose: PropTypes.func,
}

export default IngredientDetails
