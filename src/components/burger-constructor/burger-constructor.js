import constructorStyles from './burger-constructor.module.css'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import SumOrder from './sum-order/sum-order'


const BurgerConstructor = ({ data, total }) => {
    return(
        <section className={`${constructorStyles.constructorSection} pt-25`}>
            <div className={constructorStyles.list} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                {data.map( (ingredient, index) => (
                    ingredient.__v > 0 ? (
                        <div className={constructorStyles.ingredient} key={index}>
                            <div className={constructorStyles.drag}>{ ingredient.type !== "bun" ? <DragIcon type="primary" /> : <> </> }</div>
                            <ConstructorElement 
                                type={ingredient.type === "bun" ? "top" : ""}
                                isLocked={ingredient.type === "bun" ? true : false}
                                text={ingredient.name}
                                price={ingredient.price}
                                thumbnail={ingredient.image}
                            />
                        </div>
                    ) : ''
                 ) )}
            </div>
            <div>
                <SumOrder total={total} />
            </div>
        </section>
    )
}

export default BurgerConstructor