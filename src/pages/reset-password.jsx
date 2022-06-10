import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './auth.module.css'
import { fetchResetPasswordUser } from "../services/thunks";
import { WrapperPage } from "./wrapper-page";
import { PasswordInput } from "../components/password-input/password-input";

export function ResetPasswordPage() {
    const dispatch = useDispatch();
    const [form, setValue] = useState({ password: '', code: ''});
    const { error, loading, isAuthChecked, canChangePassword } = useSelector(state => state.user)

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        dispatch(fetchResetPasswordUser(form.password, form.code))
    }

    if (!isAuthChecked || !canChangePassword) {
        return  <Redirect to="/" />
    }

    return (
        <WrapperPage>
            <form className={styles.form} onSubmit={handleResetPassword}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <div className="mb-6">
                    <PasswordInput
                        placeholder="Введите новый пароль"
                        value={form.password}
                        onChange={onChange}
                        name="password"
                    />
                </div>
                <div className="mb-6"><Input placeholder="Введите код из почты" value={form.code || ""} type="text" name="code" onChange={onChange} /></div>
                <div className="mb-15">
                    <Button primary={true} disabled={!!loading}>
                        { loading ? "Загрузка..." : "Восстановить"}
                    </Button>
                </div>
                { error && <label className={` ${styles.label_success} text text_type_main-small red`}>{error}</label> }
            </form>
            <span className={`${styles.span} text text_type_main-default text_color_inactive`}>Вспомнили пароль? <Link to="/login"> Войти </Link></span>
        </WrapperPage>
    );
}