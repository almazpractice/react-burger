import ingredientStyles from './ingredient.module.css';
import React from 'react';
import PropTypes from "prop-types";
import {ingredientType} from "../../../utils/data-type";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";


const Ingredient = React.memo(({ ingredient }) => {
    const location = useLocation();

    const [{ opacity }, drag] = useDrag({
        type: 'ingredient',
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div ref={drag} className={`${ingredientStyles.ingredient} mt-6 mr-3 mb-10 ml-4`} style={{opacity}}>
            <Link to={{
                pathname: `/ingredients/${ingredient._id}`,
                state: { background: location }
            }} >
                <div data-id={ingredient._id} >
                    <div>
                        <img src={ingredient.image} alt={ingredient.name}/>
                    </div>
                    <div className={`${ingredientStyles.price} mt-1 mb-1`} >
                        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
                        <CurrencyIcon type="primary" />
                    </div>
                    <div >
                        <p className="text text_type_main-default mr-2" >{ingredient.name}</p>
                    </div>
                </div>
                <Counter count={ingredient.__v} size="default" />
            </Link>
        </div>
    )
})


Ingredient.propTypes = {
    ingredient: ingredientType.isRequired,
}


export default Ingredient