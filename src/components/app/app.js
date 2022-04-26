import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';



const App = React.memo(() => {
    const api_url = 'https://norma.nomoreparties.space/api/ingredients'

    const [state, setState] = React.useState({
        data: [],
        loading: true,
    })
    const [total, setTotal] = React.useState(0)
    const [page, setPage] = React.useState('constructor')

    useEffect(() => {
        setState({loading: true, data: []})
        getData(api_url)
    },[])
    
    useEffect( () => {
        setTotal(state.data.reduce((acc, cur) => acc + cur.price * cur.__v, 0))
    }, [state.data])

    const getData = (url) => {
        setState({...state, loading: true});
        fetch(url)
            .then(res => res.json())
            .then(res => {
                setState({...state, data: res.data, loading: false})
            })
            .catch(e => console.log(e))
    }

    const addIngredient = (ingredient) => {
        setState({...state, data: state.data.map((product) => {
            const bunsCount = state.data.filter(ingredient => {
                return (ingredient.type === 'bun' && ingredient.__v > 0)
            })
            return (
                product._id === ingredient._id && (
                    product.type !== 'bun' && product.__v++ && product ||
                    product.type === 'bun' && bunsCount.length === 0 && product.__v++ && product
                    )
                || product
            )
        })})
    }
    const removeIngredient = (ingredient) => {
        setState({
            ...state,
            data: state.data.map( (product) => {
                if (product.name !== ingredient.name || product.__v === 0 || product.type === 'bun') {
                    return product
                }
                product.__v = 0
                return product
            } )
        })
    }


    return(
        <>
            <AppHeader currentPage={page} onChangePage={setPage}/>
            {page === 'constructor' && (
                <main className='containerForBurgers'>
                    {state.data !== null && (<>
                        <BurgerIngredients data={state.data} addIngredient={addIngredient} isLoading={state.loading} />
                        <BurgerConstructor data={state.data} total={total} removeIngredient={removeIngredient} />
                    </>)}
                </main>
            )}
        </>
    );
})


export  default App;