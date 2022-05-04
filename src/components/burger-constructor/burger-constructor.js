import constructorStyles from './burger-constructor.module.css';
import IngredientConstructor from './igredient-constructor/igredient-constructor';
import {ingredientType} from '../../utils/data-type';
import OrderDetails from './order-details/order-details';
import PropTypes from 'prop-types';
import React from "react";
import SumOrder from './sum-order/sum-order';
import {useVisible} from '../../hooks/use-visible';


const BurgerConstructor = React.memo(({ ingredients, total }) => {
    const [showOrder, toggleOrderView] = useVisible()
    const [orderNumber, setOrderNumber] = React.useState(34536);
    const chosenBun = ingredients.find((ingredient) => (ingredient.type === 'bun' && ingredient.__v > 0))


    const openOrderModal = () => {
        setOrderNumber(orderNumber+1);
        toggleOrderView()
    }

    return (
        <section className={`${constructorStyles.constructorSection} pt-25`}>
            <div className={constructorStyles.list} >
                {chosenBun
                    ? (
                        <div className={constructorStyles.ingredient} >
                            <IngredientConstructor
                                ingredient={chosenBun}
                                type={'top'}
                                text={'(верх)'}
                            />
                        </div>)
                    : ''
                }
                <div className={constructorStyles.saucesMains}>
                    {ingredients.length > 0 && ingredients.map((ingredient, index) => {
                        return (
                            (ingredient.__v > 0 && ingredient.type !== 'bun') ? (
                                <div key={ingredient._id + ingredient.uuid} className={constructorStyles.ingredient} >
                                    <IngredientConstructor
                                        ingredient={ingredient}
                                    />
                                </div>
                            ) : ''
                        )
                    })}
                </div>
                {chosenBun
                    ? (<div className={constructorStyles.ingredient} >
                        <IngredientConstructor
                            ingredient={chosenBun}
                            type={'bottom'}
                            text={'(низ)'}
                        />
                    </div>)
                    : ''
                }
            </div>
            <div>
                <SumOrder total={total} openModal={openOrderModal}/>
            </div>
            {showOrder && <OrderDetails onClose={toggleOrderView} order={orderNumber}/>}
        </section>
    )
})


BurgerConstructor.propTypes = {
    ingredients: PropTypes.arrayOf(ingredientType).isRequired,
    total: PropTypes.number,
}


export default BurgerConstructor