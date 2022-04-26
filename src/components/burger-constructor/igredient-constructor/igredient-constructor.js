import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorStyles from './igredient-constructor.module.css';
import PropTypes from 'prop-types';
import React from 'react';


const IngredientConstructor = React.memo(({ingredient, type, text, removeIngredient, openModal}) => {

    return (
        <div className={constructorStyles.ingredient} key={ingredient._id} onClick={openModal} >
            
            <div className={constructorStyles.drag}>
                { ingredient.type !== "bun" ? <DragIcon type="primary" /> : <> </> }
            </div>
            <ConstructorElement 
                type={ type }
                isLocked={ingredient.type === "bun" ? true : false}
                text={text ? `${ingredient.name} ${text}` : `${ingredient.name}` }
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={() => {removeIngredient(ingredient)}}
                
            />
        </div>
    )
})


IngredientConstructor.propTypes = {
    ingredient: PropTypes.object,
    text: PropTypes.string,
    type: PropTypes.string,
    removeIngredient: PropTypes.func
}


export default IngredientConstructor