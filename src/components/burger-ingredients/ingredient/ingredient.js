import ingredientStyles from './ingredient.module.css'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const Ingredient = ({ingredient, onClick, count}) => {
    return (
        <div className={`${ingredientStyles.ingredient} mt-6 mr-3 mb-10 ml-4`}>
            <div onClick={() => { {onClick(ingredient)} }}>
            <img src={ingredient.image} alt='ingredient'/>
            <div className='mt-1 mb-1' style={{ textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className="text text_type_main-default mr-2">{ingredient.name}</p>
            </div>
            <Counter count={count} size="default" />
        </div>
    )
}

export default Ingredient