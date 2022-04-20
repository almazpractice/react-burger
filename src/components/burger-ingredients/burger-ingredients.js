import ingredientsStyles from './burger-ingredients.module.css'
import Ingredient from './ingredient/ingredient'
import IngredientsTab from './ingredients-tab/ingredients-tab'


const BurgerIngredients = ({data, onClick, state}) => {
    return(
        <section className={ingredientsStyles.ingredientsSection}>
            <div><p className="text text_type_main-large mt-10 mb-5">Соберите бургер</p></div>
            <IngredientsTab />
            <div className={ingredientsStyles.list}>
                <div id="bun" className={ingredientsStyles.title}><p className="text text_type_main-medium mt-10">Булки</p></div>
                {data.map( (ingredient, index) => (
                    ingredient.type==='bun' ?  <Ingredient key={index} state={state} ingredient={ingredient} onClick={onClick} count={ingredient.__v} /> : ''
                ))}
                <div id="sauce" className={ingredientsStyles.title}><p className="text text_type_main-medium mt-10">Соусы</p></div>
                {data.map( (ingredient, index) => (
                    ingredient.type==='sauce' ?  <Ingredient key={index}  state={state}  ingredient={ingredient} onClick={onClick} count={ingredient.__v} /> : ''
                ))}
                <div id="main" className={ingredientsStyles.title}><p className="text text_type_main-medium mt-10">Начинка</p></div>
                {data.map( (ingredient, index) => (
                    ingredient.type==='main' ?  <Ingredient key={index}  state={state}  ingredient={ingredient} onClick={onClick} count={ingredient.__v} /> : ''
                ))}
            </div>
        </section>
    )
}

export default BurgerIngredients