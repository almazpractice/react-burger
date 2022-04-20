import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import logoStyles from "./header-logo.module.css"
import backgroundImage from '../../../images/logo-text.png'


const logoBackground = {
    background: `url(${backgroundImage})`
}

const HeaderLogo = (props) => {
    return (
        <div className={`${logoBackground} ${logoStyles.logo}`}>
            <Logo />
        </div>
    )
}

export default HeaderLogo