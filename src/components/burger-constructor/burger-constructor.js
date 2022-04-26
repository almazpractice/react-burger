import constructorStyles from './burger-constructor.module.css';
import SumOrder from './sum-order/sum-order';
import IngredientConstructor from './igredient-constructor/igredient-constructor';
import PropTypes from 'prop-types';
import dataPropTypes from '../../utils/data-type';
import IngredientDetails from './ingredient-details/ingredient-details';
import {useVisible} from '../../hooks/use-visible';
import { useState } from 'react';
import OrderDetails from './order-details/order-details';



const BurgerConstructor = ({ data, total, removeIngredient }) => {
    const [showDetails, toggleDetailView] = useVisible()
    const [showOrder, toggleOrderView] = useVisible()
    const [orderNumber, setOrderNumber] = useState(34536);
    const [selectedItem, setSelectedItem] = useState(null)
    const choosedBun = data.find((ingredient) => (ingredient.type === 'bun' && ingredient.__v > 0))


    const openDetailModal = (e) => {
        let id = e.currentTarget.getAttribute('data-id');
        setSelectedItem(data.filter(x => x._id === id)[0]);
        toggleDetailView();
    }
    const openOrderModal = () => {
        setOrderNumber(orderNumber+1);
        toggleOrderView()
    }
    
    return (
        <section className={`${constructorStyles.constructorSection} pt-25`}>
            {showDetails && <IngredientDetails onClose={toggleDetailView} isVisible={showDetails} ingredient={selectedItem}/>}
            <div className={constructorStyles.list} >
                {choosedBun
                    ? (
                        <div className={constructorStyles.ingredient} onClick={openDetailModal} data-id={choosedBun._id}>
                            <IngredientConstructor 
                                ingredient={choosedBun}
                                type={'top'}
                                text={'(верх)'}
                                removeIngredient={removeIngredient}
                            />
                        </div>)
                    : ''
                }
                <div className={constructorStyles.saucesMains}>
                {data.map( (ingredient, index) => {
                    return (
                        (ingredient.__v > 0 && ingredient.type !== 'bun') ? (
                            <div key={ingredient._id} className={constructorStyles.ingredient} onClick={openDetailModal} data-id={ingredient._id}>
                                    <IngredientConstructor  ingredient={ingredient} removeIngredient={removeIngredient} openModal={openDetailModal}/>
                                </div>
                            ) : ''
                            )
                        } )}
                </div>
                {choosedBun
                    ? (<div className={constructorStyles.ingredient} data-id={choosedBun._id} onClick={openDetailModal}>
                            <IngredientConstructor 
                                ingredient={choosedBun}
                                type={'bottom'}
                                text={'(низ)'}
                                removeIngredient={removeIngredient}
                                />
                        </div>)
                    : ''
                }
            </div>
            <div>
                <SumOrder total={total} openModal={openOrderModal}/>
            </div>
            {showOrder && <OrderDetails onClose={toggleOrderView} isVisible={showOrder} order={orderNumber}/>}
        </section>
    )
}


BurgerConstructor.propTypes = {
    data: dataPropTypes,
    total: PropTypes.number,
    removeIngredient: PropTypes.func
}


export default BurgerConstructor