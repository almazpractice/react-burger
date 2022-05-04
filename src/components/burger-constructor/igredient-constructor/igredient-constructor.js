import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './igredient-constructor.module.css';
import {ingredientType} from "../../../utils/data-type";
import PropTypes from 'prop-types';
import React from 'react';


const IngredientConstructor = React.memo(({ingredient, type, text }) => {

    return (
        <div className={constructorStyles.ingredient} key={ingredient._id}>
            
            <div className={constructorStyles.drag}>
                { ingredient.type !== "bun" ? <DragIcon type="primary" /> : <> </> }
            </div>
            <ConstructorElement 
                type={ type }
                isLocked={ingredient.type === "bun"}
                text={text ? `${ingredient.name} ${text}` : `${ingredient.name}` }
                price={ingredient.price}
                thumbnail={ingredient.image}

            />
        </div>
    )
})


IngredientConstructor.propTypes = {
    ingredient: ingredientType.isRequired,
    text: PropTypes.string,
    type: PropTypes.string,
}


export default IngredientConstructor