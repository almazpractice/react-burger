import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";


const App = React.memo(() => {
    const [page, setPage] = React.useState('constructor')

    return(
        <>
            <AppHeader currentPage={page} onChangePage={setPage}/>
            <DndProvider backend={HTML5Backend}>
            {page === 'constructor' && (
                    <main className='containerForBurgers'>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </main>
            )}
            </DndProvider>
        </>
    );
})


export  default App;