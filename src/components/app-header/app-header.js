import HeaderButton from './header-button/header-button'
import headerStyles from './app-header.module.css'
import { BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderLogo from './header-logo/header-logo'


function AppHeader() {
    return (
        <header className={headerStyles.header} >
            <HeaderButton icon={BurgerIcon} buttonText="Конструктор"/>
            <HeaderButton icon={ListIcon} buttonText="Лента заказов"/>
            <HeaderLogo />
            <HeaderButton icon={ProfileIcon} buttonText="Личный кабинет"/>
        </header>
    )
}

export default AppHeader