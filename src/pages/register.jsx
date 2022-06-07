import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './auth.module.css';
import { fetchRegister } from "../services/thunks";
import { WrapperPage } from "./wrapper-page";
import { PasswordInput } from "../components/password-input/password-input";

export function RegisterPage() {
    const dispatch = useDispatch()
    const [form, setValue] = useState({ name: '', email: '', password: '' });
    const { error, loading, isAuthenticated, user } = useSelector(state => state.user)

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const signUp = async (e) => {
        e.preventDefault();
        dispatch(fetchRegister(form.name, form.email, form.password));
        if (user.name !== undefined) {
            return <Redirect to="/" />
        }
    };

    return (
        <WrapperPage>
            <form className={styles.form} onSubmit={signUp}>
                <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                <div className="mb-6"><Input placeholder="Имя" value={form.name} name="name" onChange={onChange} /></div>
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
                        { loading ? "Загрузка..." : "Зарегистрироваться" }
                    </Button>
                </div>
                { error && <label className={` ${styles.label_success} text text_type_main-small red`}>{error}</label> }
            </form>
            <span className={`${styles.span} text text_type_main-default text_color_inactive`}>Уже зарегистрированы? <Link to="/login"> Войти </Link></span>
        </WrapperPage>
    );
}