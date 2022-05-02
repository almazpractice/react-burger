import ingredientsStyles from './burger-ingredients.module.css';
import Ingredient from './ingredient/ingredient';
import IngredientsTab from './ingredients-tab/ingredients-tab';
import IngredientDetails from "./ingredient-details/ingredient-details";
import {ingredientType} from "../../utils/data-type";
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import {useVisible} from '../../hooks/use-visible';



const BurgerIngredients = React.memo(({ingredients, isLoading}) => {
    const [tab, setTab] = React.useState('buns')
    const [showDetails, toggleDetailView] = useVisible()
    const [selectedItem, setSelectedItem] = useState(null)


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


    const openDetailModal = (e) => {
        let id = e.currentTarget.getAttribute('data-id');
        const item = ingredients.filter(x => x._id === id)[0]
        setSelectedItem(item);
        toggleDetailView();
    }

    return(
        <section className={ingredientsStyles.ingredientsSection} >
            {showDetails && <IngredientDetails onClose={toggleDetailView} ingredient={selectedItem}/>}
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
                    <div id="buns" ref={bunsRef} className={ingredientsStyles.title}>
                        <p className="text text_type_main-medium mt-10">Булки</p>
                    </div>
                    {ingredients.map( (ingredient, index) => (
                        ingredient.type==='bun'
                            ?  <Ingredient
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                    openModal={openDetailModal}
                                />
                            : ''
                    ))}
                    <div id="sauces" ref={saucesRef} className={ingredientsStyles.title}>
                        <p className="text text_type_main-medium mt-10">Соусы</p>
                    </div>
                    {ingredients.map( (ingredient, index) => (
                        ingredient.type==='sauce'
                            ?  <Ingredient
                                    key={ingredient._id}
                                    ingredient={ingredient}
                                    openModal={openDetailModal}
                                />
                            : ''
                    ))}
                    <div id="stuffing" ref={mainRef} className={ingredientsStyles.title}>
                        <p className="text text_type_main-medium mt-10">Начинка</p>
                    </div>
                    {ingredients.map( (ingredient, index) => (
                        ingredient.type==='main'
                        ?  <Ingredient
                            key={ingredient._id}
                            ingredient={ingredient}
                            openModal={openDetailModal}
                        />
                        : ''
                    ))}
                </div>
            )}
        </section>
        
    )
})


BurgerIngredients.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
    isLoading: PropTypes.bool
}


export default BurgerIngredients