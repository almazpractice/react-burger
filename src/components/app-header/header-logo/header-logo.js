import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import logoStyles from "./header-logo.module.css"


const HeaderLogo = () => {

    return (
        <div className={logoStyles.logo}>
            <Logo />
        </div>
    )
}

export default HeaderLogo