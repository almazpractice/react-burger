import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './auth.module.css'
import { FormPage } from "./form-page";
import { fetchForgotPasswordUser } from "../services/thunks";

export function ForgotPasswordPage() {
    const dispatch = useDispatch()
    const [form, setValue] = useState({ email: '' });
    const { error, loading } = useSelector(state => state.user)

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        dispatch(fetchForgotPasswordUser(form.email));
    }

    return (
        <FormPage>
            <form className={styles.form} onSubmit={handleForgotPassword}>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <div className="mb-6"><Input placeholder="E-mail" value={form.email} name="email" onChange={onChange} /></div>
                <div className="mb-5">
                    <Button primary={true} disabled={!!loading}>
                        {loading ? "Загрузка..." : "Восстановить"}
                    </Button>
                </div>
                { error && <label className={` ${styles.label_success} text text_type_main-small red`}>{error}</label> }
            </form>
            <span className={`${styles.span} text text_type_main-default text_color_inactive mt-10`}>Вспомнили пароль? <Link to="/login"> Войти </Link></span>
        </FormPage>
    );
}