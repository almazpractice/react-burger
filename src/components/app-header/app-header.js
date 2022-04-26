import HeaderButton from './header-button/header-button';
import headerStyles from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import HeaderLogo from './header-logo/header-logo';
import React from 'react';
import PropTypes from 'prop-types';


const AppHeader = React.memo(({currentPage, onChangePage}) => {

    return (
        <header className={headerStyles.header} >
            <HeaderButton 
                active={currentPage === 'constructor'}
                icon={BurgerIcon}
                buttonText="Конструктор"
                onClick={() => onChangePage('constructor')} 
            />
            <HeaderButton 
                active={currentPage === 'orders'}
                icon={ListIcon}
                buttonText="Лента заказов"
                onClick={() => onChangePage('orders')} 
            />
            <HeaderLogo />
            <HeaderButton 
                active={currentPage === 'profile'}
                icon={ProfileIcon}
                buttonText="Лента заказов"
                onClick={() => onChangePage('profile')} 
            />
        </header>
    )
})

AppHeader.propTypes = {
    currentPage: PropTypes.string,
    onChangePage: PropTypes.func
}

export default AppHeader