import ingredientsStyles from './burger-ingredients.module.css';
import Ingredient from './ingredient/ingredient';
import IngredientsTab from './ingredients-tab/ingredients-tab';
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/data-type';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import React, { useEffect } from 'react';


const BurgerIngredients = React.memo(({data, addIngredient, isLoading}) => {
    const [tab, setTab] = React.useState('buns')

    const bunsElem = document.getElementById("buns");
    const saucesElem = document.getElementById("sauces");
    const stuffingElem = document.getElementById("stuffing");

    const bunsRef = React.useRef(null)
    const saucesRef = React.useRef(null)
    const mainRef = React.useRef(null)
            

    useEffect(() => {
        if (tab !== null && tab === 'buns' && bunsElem) {
            bunsElem.scrollIntoView({behavior: 'smooth'})
        } else if (tab !== null  && tab === 'sauces' && saucesElem) {
            saucesElem.scrollIntoView({behavior: 'smooth'})
        } else if (tab !== null  && tab === 'stuffing' && stuffingElem) {
            stuffingElem.scrollIntoView({behavior: 'smooth'})
        } 
    }, [tab])


    return(
        <section className={ingredientsStyles.ingredientsSection} >
            <div>
            <p className={`text text_type_main-large mt-10 mb-5 ${ingredientsStyles.title}`}>
                Соберите бургер
            </p>
            </div>
            <IngredientsTab tab={tab} changeTab={setTab}/>
            { isLoading 
            ? <p className="text text_type_main-medium mt-10">Загрузка данных...</p> 
            : (
                <div className={ingredientsStyles.list}>
                    <div id="buns" ref={bunsRef} className={ingredientsStyles.title}><p className="text text_type_main-medium mt-10">Булки</p></div>
                    {data.map( (ingredient, index) => (
                        ingredient.type==='bun' ?  <Ingredient key={ingredient._id} ingredient={ingredient} addIngredient={addIngredient} /> : ''
                    ))}
                    <div id="sauces" ref={saucesRef} className={ingredientsStyles.title}><p className="text text_type_main-medium mt-10">Соусы</p></div>
                    {data.map( (ingredient, index) => (
                        ingredient.type==='sauce' ?  <Ingredient key={ingredient._id} ingredient={ingredient} addIngredient={addIngredient} /> : ''
                    ))}
                    <div id="stuffing" ref={mainRef} className={ingredientsStyles.title}><p className="text text_type_main-medium mt-10">Начинка</p></div>
                    {data.map( (ingredient, index) => (
                        ingredient.type==='main' ?  <Ingredient key={ingredient._id} ingredient={ingredient} addIngredient={addIngredient} /> : ''
                    ))}
                </div>
            )}
        </section>
        
    )
})


BurgerConstructor.propTypes = {
    data: dataPropTypes,
    addIngredient: PropTypes.func,
    isLoading: PropTypes.bool
}


export default BurgerIngredients