import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import API_URL from "../../utils/api-burger";
import { v4 } from 'uuid';
import _ from "lodash";


const App = React.memo(() => {
    const [state, setState] = React.useState({
        data: [],
        loading: true,
    })
    const [total, setTotal] = React.useState(0)
    const [page, setPage] = React.useState('constructor')
    const [card, setCard] = React.useState([])

    useEffect(() => {
        const getData = (url) => {
            setState({...state, loading: true});
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    const dataToIngredients = res.data.map(ingredient => {
                        ingredient.__v++
                        return ingredient
                    })
                    setState({...state, data: dataToIngredients, loading: false})

                })
                .catch(e => console.error(`Ошибка в функции getData! ${e}`))
        }

        setState({loading: true, data: []})
        getData(API_URL + '/ingredients')

    },[])

    useEffect(() => {
        // временный код, для заполнения корзины и дублирования ингредиентов
        if (state.data.length) {
            const repeatCopyIngredient = _.cloneDeep(state.data[2])
            repeatCopyIngredient.uuid = v4()
            setCard([repeatCopyIngredient, ...state.data.map (ingredient => {
                const ingredientCopy = _.cloneDeep(ingredient)
                ingredientCopy.uuid = v4()
                return ingredientCopy
            })])
        }
    },[state.data])


    useEffect( () => {
        setTotal(state.data.reduce((acc, cur) => acc + cur.price * cur.__v, 0))
    }, [state.data])

    return(
        <>
            <AppHeader currentPage={page} onChangePage={setPage}/>
            {page === 'constructor' && (
                <main className='containerForBurgers'>
                    {state.data !== null && card !== null && (<>
                        <BurgerIngredients ingredients={state.data} isLoading={state.loading} />
                        <BurgerConstructor ingredients={card} total={total} />
                    </>)}
                </main>
            )}
        </>
    );
})


export  default App;