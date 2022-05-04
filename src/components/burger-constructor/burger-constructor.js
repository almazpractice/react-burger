import constructorStyles from './burger-constructor.module.css';
import IngredientConstructor from './igredient-constructor/igredient-constructor';
import OrderDetails from './order-details/order-details';
import React from "react";
import SumOrder from './sum-order/sum-order';
import {useVisible} from '../../hooks/use-visible';
import { BurgerConstructorContext, TotalPriceContext, OrderNumberContext } from '../../services/burger-constructor-context';
import {getOrderNumber} from "../../utils/api-burger";


const BurgerConstructor = React.memo(() => {
    const [showOrder, toggleOrderView] = useVisible()
    const { burgerConstructorData } = React.useContext(BurgerConstructorContext);
    const { totalPriceDispatcher } = React.useContext(TotalPriceContext);
    const { setOrderNumber } = React.useContext(OrderNumberContext);
    const [ loading, setLoading ] = React.useState(false);

    const openOrderModal = () => {
        toggleOrderView()
    }

    const bunIngredient = React.useMemo(
        () => burgerConstructorData.find(x => (x.type === 'bun' && x.__v > 0)),
        [burgerConstructorData]
    );

    const notBunIngredients = React.useMemo(
        () => burgerConstructorData.filter(x => (x.type !== 'bun' && x.__v > 0)),
        [burgerConstructorData]
    );

    const createOrder = async () => {
        setLoading(true);
        const ingredientsIdArr = burgerConstructorData.map(item => item._id)
        await getOrderNumber(ingredientsIdArr)
            .then(orderNumber => setOrderNumber(orderNumber))
            .finally(() => setLoading(false))
            .catch(e => console.log(e))
            .then(openOrderModal)
    }


    React.useEffect(
        () => {
            if (burgerConstructorData.length > 0 && bunIngredient) {
                totalPriceDispatcher({
                    type: 'set',
                    payload: notBunIngredients.reduce((sum, a) => sum + a.price, 0) + bunIngredient.price * 2
                });
            }
        },
        [burgerConstructorData]
    );

    return (
        <section className={`${constructorStyles.constructorSection} pt-25`}>
            <div className={constructorStyles.list} >
                {bunIngredient
                    ? (
                        <div className={constructorStyles.ingredient} >
                            <IngredientConstructor
                                ingredient={bunIngredient}
                                type={'top'}
                                text={'(верх)'}
                            />
                        </div>)
                    : ''
                }
                <div className={constructorStyles.saucesMains}>
                    {burgerConstructorData.length > 0 && burgerConstructorData.map((ingredient, index) => {
                        return (
                            (ingredient.__v > 0 && ingredient.type !== 'bun') ? (
                                <div key={ingredient.uuid} className={constructorStyles.ingredient} >
                                    <IngredientConstructor
                                        ingredient={ingredient}
                                    />
                                </div>
                            ) : ''
                        )
                    })}
                </div>
                {bunIngredient
                    ? (<div className={constructorStyles.ingredient} >
                        <IngredientConstructor
                            ingredient={bunIngredient}
                            type={'bottom'}
                            text={'(низ)'}
                        />
                    </div>)
                    : ''
                }
            </div>
            <div>
                <SumOrder handleCLick={createOrder} loading={loading} />
            </div>
            {showOrder && <OrderDetails onClose={toggleOrderView} />}
        </section>
    )
})


export default React.memo(BurgerConstructor)