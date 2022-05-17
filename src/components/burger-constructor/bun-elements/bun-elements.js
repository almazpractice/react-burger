import bunElementStyles from './bun-elements.module.css'
import React from "react";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientType} from "../../../utils/data-type";
import PropTypes from "prop-types";

const ExistingBunElement = React.memo(({ingredient, position}) => {
    const text = (position === 'top' ? "(верх)" : "(низ)");

    return (
        <div className={`pl-4 ml-4 mr-4 ${position==='top' ? "mb-2" : "mt-2"} `}>


            <ConstructorElement
                isLocked={ingredient.type === "bun"}
                text={`${ingredient.name} ${text}`}
                price={ingredient.price}
                thumbnail={ingredient.image}
                type={position}
            />
        </div>
    )
})

const EmptyBunElement = React.memo(({position}) => {
    let styleClassName = position === "top" ? "constructor-element_pos_top" : "constructor-element_pos_bottom";
    return (
        <div className={`pl-4 pr-4 ml-4 mr-4 ${position==='top' ? "mb-2" : "mt-2"}`}>
            <div className={` ${bunElementStyles.emptyElement} ${styleClassName}`}>
                <p>Выберите булку</p>
            </div>
        </div>
    );
})

const BunElement = React.memo(({ ingredient, position }) => {
    return (
        <>
            {ingredient
                ? <ExistingBunElement ingredient={ingredient} position={position} />
                : <EmptyBunElement position={position} />}
        </>
    );
})

ExistingBunElement.propTypes = {
    ingredient: ingredientType.isRequired,
    position: PropTypes.string.isRequired
}

EmptyBunElement.propTypes = {
    position: PropTypes.string.isRequired
}

ExistingBunElement.propTypes = {
    ingredient: ingredientType.isRequired,
    position: PropTypes.string.isRequired
}
export default BunElement