import React, { useEffect, useReducer } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { getIngredientsData } from "../../utils/api-burger";
import { v4 } from 'uuid';
import _ from "lodash";
import { BurgerConstructorContext, TotalPriceContext, OrderNumberContext } from '../../services/burger-constructor-context';


const totalPriceInitialState = { totalPrice: 0 }

function totalPriceReducer(state, action) {
    switch (action.type) {
        case "set":
            return { totalPrice: action.payload };
        case "reset":
            return { totalPrice: totalPriceInitialState };
        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}


const App = React.memo(() => {

    const [ loading, setLoading ] = React.useState(false)
    const [ data, setData ] = React.useState([])
    const [page, setPage] = React.useState('constructor')
    const [burgerConstructorData, setBurgerConstructorData] = React.useState([]);
    const [orderNumber, setOrderNumber] = React.useState(0);
    const [totalPriceState, totalPriceDispatcher] = useReducer(totalPriceReducer, totalPriceInitialState, undefined);


    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            setData([]);

            await getIngredientsData()
                .then((data) => {
                    setData(data);

                    // TO-FIX: временный код для заполнения конструктора
                    if (data.length) {
                        const repeatCopyIngredient = _.cloneDeep(data[2])
                        repeatCopyIngredient.uuid = v4()
                        repeatCopyIngredient.__v++
                        setBurgerConstructorData([repeatCopyIngredient, ...data.map (ingredient => {
                            const ingredientCopy = _.cloneDeep(ingredient)
                            ingredientCopy.__v++
                            ingredientCopy.uuid = v4()
                            return ingredientCopy
                        })])
                    }

                })
                .finally(() => {
                        setLoading(false);
                    }
                ).
                catch((e) => {
                    console.error(e);
                });
        }

        getData();
    }, [])


    return(
        <>
            <AppHeader currentPage={page} onChangePage={setPage}/>
            {page === 'constructor' && (
                <main className='containerForBurgers'>
                    {data !== null && burgerConstructorData !== null && (<>
                        <BurgerIngredients ingredients={data} isLoading={loading} />
                        {/*<BurgerConstructor ingredients={card} total={total} />*/}
                        <BurgerConstructorContext.Provider value={{ burgerConstructorData }}>
                            <TotalPriceContext.Provider value={{ totalPriceState, totalPriceDispatcher }}>
                                <OrderNumberContext.Provider value={{ orderNumber, setOrderNumber }}>
                                    <BurgerConstructor />
                                </OrderNumberContext.Provider>
                            </TotalPriceContext.Provider>
                        </BurgerConstructorContext.Provider>
                    </>)}
                </main>
            )}
        </>
    );
})


export  default App;