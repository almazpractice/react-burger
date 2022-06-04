import styles from './auth.module.css'
import {FormPage} from "./form-page";
import {Link} from "react-router-dom";
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {PasswordInput} from "../components/password-input/password-input";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchLogin} from "../services/thunks/user";

export function LoginPage() {
    const [form, setValue] = useState({ email: '', password: '' });
    const dispatch = useDispatch()
    const { loading, error } = useSelector(state => state.user)

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const login = async (e) => {
        e.preventDefault();
        dispatch(fetchLogin(form.email, form.password));
    }


    return (
        <FormPage>
            <form className={styles.form} onSubmit={login}>
                <h1 className="text text_type_main-medium mb-6">Вход</h1>
                <div className="mb-6"><Input placeholder="E-mail" value={form.email} name="email" onChange={onChange} /></div>
                <div className="mb-6">
                    <PasswordInput
                        placeholder="Пароль"
                        value={form.password}
                        onChange={onChange}
                        name="password"
                    />
                </div>
                <div className="mb-15">
                <Button primary={true} disabled={!!loading}>
                    {loading ? "Загрузка..." : "Войти"}
                </Button>
                </div>
                { error && <label className={` ${styles.label_success} text text_type_main-small red`}>{error}</label> }
            </form>
            <span className={`${styles.span} text text_type_main-default text_color_inactive`}>Вы — новый пользователь? <Link to="/register"> Зарегистрироваться </Link></span>
            <span className={`${styles.span} text text_type_main-default text_color_inactive`}>Забыли пароль? <Link to="/forgot-password"> Восстановить пароль </Link></span>
        </FormPage>
    );
}