import styles from './app-header.module.css';
import { BurgerIcon, ListIcon, ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import React, { memo } from 'react';
import {Link, useLocation} from "react-router-dom";


const AppHeader = () => {
    const pathname = useLocation().pathname;

    return (
        <header className={styles.header} >
            <nav className={styles.menu}>
                <div className={styles.menu_item}>
                    <Link className={`${styles.menu_item_link} p-4 mt-4 mb-4`} to="/">
                        <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
                        <span className={`${pathname !== '/' && "text_color_inactive"} text text_type_main-default ml-2`}>
                          Конструктор
                        </span>
                    </Link>
                    <Link className={`${styles.menu_item_link} p-4 mt-4 mb-4`} to="/orders">
                        <ListIcon type={pathname === '/orders' ? 'primary' : 'secondary'} />
                        <span className={`${pathname !== '/orders' && "text_color_inactive"} text text_type_main-default ml-2`}>
                          Лента заказов
                        </span>
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link className={`${styles.menu_item_link} ${styles.menu_item_logo}`} to="/">
                        <Logo />
                    </Link>
                </div>
                <div className={styles.menu_item}>
                    <Link className={`${styles.menu_item_link} p-4 mt-4 mb-4`} to="/profile">
                        <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
                        <span className={`${pathname !== '/profile' && "text_color_inactive"} text text_type_main-default ml-2`}>
                          Личный кабинет
                        </span>
                    </Link>
                </div>
            </nav>
        </header>
    )
}


export default  memo(AppHeader)