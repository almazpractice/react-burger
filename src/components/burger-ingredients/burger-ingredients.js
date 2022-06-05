import ingredientsStyles from './burger-ingredients.module.css';
import React, { useEffect, useState } from 'react';
import Ingredient from './ingredient/ingredient';
import IngredientDetails from "./ingredient-details/ingredient-details";
import { useVisible } from '../../hooks/use-visible';
import { useDispatch, useSelector } from "react-redux";
import { fetchIngredients } from "../../services/thunks";
import { setSelectedIngredient } from "../../services/slices";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";



const BurgerIngredients = React.memo(() => {
    const [tab, setTab] = useState('buns');
    const [showDetails, toggleDetailView] = useVisible();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.ingredients.loading);
    const error = useSelector(state => state.ingredients.error);
    const ingredients = useSelector(state => state.ingredients.ingredients);
    const bunsRef = React.useRef(null)
    const saucesRef = React.useRef(null)
    const stuffingRef = React.useRef(null)

    useEffect(() => {
        if (!loading && ingredients.length === 0) {
            dispatch(fetchIngredients());
        }
    }, [])

    const openDetailModal = (e) => {
        let id = e.currentTarget.getAttribute('data-id');
        const item = ingredients.filter(x => x._id === id)[0]
        dispatch(setSelectedIngredient(item));
        toggleDetailView();
    }

    const closeDetailModal = () => {
        dispatch(setSelectedIngredient({}))
        toggleDetailView();
    }

    const handleScroll = (e) => {
        const y = e.currentTarget.getBoundingClientRect().y + 100;
        const stuffingsY = stuffingRef.current.getBoundingClientRect().y;
        const sauceY = saucesRef.current.getBoundingClientRect().y;
        stuffingsY < y ? setTab('stuffing') : sauceY < y ? setTab('sauces') : setTab('buns');
    }

    return(
        <section className={ingredientsStyles.ingredientsSection} >
            {showDetails && <IngredientDetails onClose={closeDetailModal}/>}
            <div>
            <p className={`text text_type_main-large mt-10 mb-5 ${ingredientsStyles.title}`}>
                Соберите бургер
            </p>
            </div>
            <div className={ingredientsStyles.tabsSection}>
                <Tab value="buns" active={tab === 'buns'} onClick={() => bunsRef.current.scrollIntoView({ behavior: "smooth" })}>
                    Булки
                </Tab>
                <Tab value="sauces" active={tab === 'sauces'} onClick={() => saucesRef.current.scrollIntoView({ behavior: "smooth" })}>
                    Соусы
                </Tab>
                <Tab value="main" active={tab === 'stuffing'} onClick={() => stuffingRef.current.scrollIntoView({ behavior: "smooth" })}>
                    Начинка
                </Tab>
            </div>
            { error
            ?  <p className="text text_type_main-medium mt-10">Ошибка загрузки данных. Проверьте подключение к сети.</p>
            : loading
            ? <p className="text text_type_main-medium mt-10">Загрузка данных...</p> 
            : (<div className={ingredientsStyles.list}  onScroll={handleScroll}>
                <div id="buns" ref={bunsRef} className={ingredientsStyles.title}>
                    <p className="text text_type_main-medium mt-10">Булки</p>
                </div>
                {ingredients.map( (ingredient, index) => (
                    ingredient.type==='bun' ? <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openDetailModal} /> : ''
                ))}
                <div id="sauces" ref={saucesRef} className={ingredientsStyles.title}>
                    <p className="text text_type_main-medium mt-10">Соусы</p>
                </div>
                {ingredients.map( (ingredient, index) => (
                    ingredient.type==='sauce' ?  <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openDetailModal} /> : ''
                ))}
                <div id="stuffing" ref={stuffingRef} className={ingredientsStyles.title}>
                    <p className="text text_type_main-medium mt-10">Начинка</p>
                </div>
                {ingredients.map( (ingredient, index) => (
                    ingredient.type==='main' ?  <Ingredient key={ingredient._id} ingredient={ingredient} openModal={openDetailModal} /> : ''
                ))}
            </div>)}
        </section>
        
    )
})

export default BurgerIngredients