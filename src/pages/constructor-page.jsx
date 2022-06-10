import React from "react";
import styles from './constructor-page.module.css'
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import AppHeader from "../components/app-header/app-header";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

export const ConstructorPage = React.memo(() => {

    return (
        <>
            <AppHeader />
            <DndProvider backend={HTML5Backend}>
                <main className={styles.containerForBurgers}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </main>
            </DndProvider>
        </>
    )
})