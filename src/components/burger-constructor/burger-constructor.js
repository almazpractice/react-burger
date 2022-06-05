import styles from './burger-constructor.module.css';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderDetails from './order-details/order-details';
import SumOrder from './sum-order/sum-order';
import NotBunElements from './not-bun-elements/not-bun-elements';
import BunElement from "./bun-elements/bun-elements";
import { useVisible } from '../../hooks/use-visible';
import { fetchCreateOrder } from "../../services/thunks";
import { addIngredient, increaseIngredient, setTotalPrice } from "../../services/slices";
import { useDrop } from "react-dnd";


const BurgerConstructor = React.memo(() => {
    const dispatch = useDispatch()
    const burgerConstructorData = useSelector(state => state.ingredients.cart)
    const [showOrder, toggleOrderView] = useVisible()
    const error = useSelector(state => state.ingredients.error)

    const addItem = (item) => {
        dispatch(addIngredient(item))
        dispatch(increaseIngredient(item))
    }

    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            addItem(item)
        },
        collect: monitor => ({
            isHover: monitor.isOver()
        })
    });

    const openOrderModal = async () => {
        await dispatch(fetchCreateOrder(burgerConstructorData.map(item => item._id)))
            .then(() => toggleOrderView())
    }

    const closeOrderModal = () => {
        toggleOrderView()
    }

    const bunIngredient = React.useMemo(
        () => {
            if (burgerConstructorData) {
                return burgerConstructorData.filter(x => (x && x.type === 'bun'))[0]
            }
        },
        [burgerConstructorData]
    );

    const notBunIngredients = React.useMemo(
        () => {
            if (burgerConstructorData) {
                return burgerConstructorData.filter(x => (x && x.type !== 'bun'))
            }
        },
        [burgerConstructorData]
    );

    useEffect(
        () => {
            if (burgerConstructorData) {
                dispatch(setTotalPrice(burgerConstructorData.reduce((sum, x) => x ? (sum + x.price) : sum, 0)));
            } else {
                dispatch(setTotalPrice(0))
            }
        },
        [burgerConstructorData]
    );



    return (
        <>
             <section className={`${styles.constructorSection} pt-25 `}>
                 {!error && <div className={`${styles.list} ${isHover ? styles.isHover : ''}`} ref={dropTarget} >
                    <div>
                        <BunElement
                            ingredient={bunIngredient}
                            position={'top'}
                        />
                    </div>
                    <div className={styles.saucesMains}>
                        {notBunIngredients && notBunIngredients.map((ingredient, index) => {
                            return (
                                (ingredient.type !== 'bun') ? (
                                        <NotBunElements
                                            ingredient={ingredient} index={index} key={ingredient.uuid}
                                        />
                                ) : ''
                            )
                        })}
                    </div>
                    <div>
                        <BunElement
                            ingredient={bunIngredient}
                            position={'bottom'}
                        />
                    </div>
                </div>}
                <div>
                    {!error && <SumOrder handleModal={openOrderModal}/>}
                </div>
                {showOrder && !error && <OrderDetails onClose={closeOrderModal} />}
            </section>
        </>
    )
})


export default React.memo(BurgerConstructor)