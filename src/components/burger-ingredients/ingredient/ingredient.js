import ingredientStyles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import {ingredientType} from "../../../utils/data-type";


const Ingredient = React.memo(({ingredient, openModal, dataId}) => {
    return (
        <div className={`${ingredientStyles.ingredient} mt-6 mr-3 mb-10 ml-4`}>
            <div data-id={dataId} onClick={openModal}>
                <div>
                    <img src={ingredient.image} alt={ingredient.name}/>
                </div>
                <div className={`${ingredientStyles.price} mt-1 mb-1`} >
                    <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <div>
                    <p className="text text_type_main-default mr-2" >{ingredient.name}</p>
                </div>
            </div>
            <Counter count={ingredient.__v} size="default" />
        </div>
    )
})


Ingredient.propTypes = {
    ingredient: ingredientType.isRequired,
}


export default Ingredient