import React, { useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

const API_URL = 'https://norma.nomoreparties.space/api/ingredients'

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
                    const dataToConstructor = res.data.map(ingredient => {
                        ingredient.__v++
                        return ingredient
                    })
                    setState({...state, data: dataToConstructor, loading: false})
                })
                .catch(e => console.log(e))
        }

        setState({loading: true, data: []})
        getData(API_URL)

    },[])

    useEffect(() => {
        setCard([...state.data])
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
                        <BurgerIngredients data={state.data} isLoading={state.loading} />
                        <BurgerConstructor card={card} total={total} />
                    </>)}
                </main>
            )}
        </>
    );
})


export  default App;