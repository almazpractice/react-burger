import ingredientStyles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import React from 'react';


const Ingredient = React.memo(({ingredient, addIngredient}) => {
    return (
        <div className={`${ingredientStyles.ingredient} mt-6 mr-3 mb-10 ml-4`}>
            <div onClick={() => {addIngredient(ingredient)}}>
            <img src={ingredient.image} alt={ingredient.name}/>
            <div className={`${ingredientStyles.price} mt-1 mb-1`} >
                <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default mr-2">{ingredient.name}</p>
            </div>
            <Counter count={ingredient.__v} size="default" />
        </div>
    )
})


Ingredient.propTypes = {
    ingredient: PropTypes.object.isRequired,
    addIngredient: PropTypes.func.isRequired
}


export default Ingredient