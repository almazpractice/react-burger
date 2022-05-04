import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import tabStyles from './ingredients-tab.module.css'
import PropTypes from "prop-types";

const IngredientsTab = ({tab, changeTab}) => {


    return (
        <div className={tabStyles.tabsSection}>
        <Tab value="buns" active={tab === 'buns'} onClick={() => changeTab("buns")}>
            Булки
        </Tab>
        <Tab value="sauces" active={tab === 'sauces'} onClick={() => changeTab("sauces")}>
            Соусы
        </Tab>
        <Tab value="main" active={tab === 'main'} onClick={() => changeTab("stuffing")}>
            Начинка
        </Tab>
        </div>
    )
}

IngredientsTab.propTypes = {
    tab: PropTypes.string,
    changeTab: PropTypes.func
}

export default IngredientsTab