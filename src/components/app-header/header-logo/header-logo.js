import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import logoStyles from "./header-logo.module.css"
import backgroundImage from '../../../images/logo-text.png'


const HeaderLogo = () => {
    const logoBackground = {
        background: `url(${backgroundImage})`
    }
    return (
        <div className={`${logoBackground} ${logoStyles.logo}`}>
            <Logo />
        </div>
    )
}

export default HeaderLogo