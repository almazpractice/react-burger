import  styles from './auth.module.css'
import {useDispatch, useSelector} from "react-redux";
import {fetchChangeProfileInfo, fetchLogout} from "../services/thunks/user";
import AppHeader from "../components/app-header/app-header";
import {Input, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import { Link, useLocation } from 'react-router-dom';


export const ProfilePage = () => {
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;
    const { error, loading, isAuthenticated } = useSelector(state => state.user);
    const [ form, setValue] = useState({email: "", name: "", password: ""});

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };
    const logout = (e) => {
        dispatch(fetchLogout());
    };

    const changeProfile = async (e) => {
        e.preventDefault();
        fetchChangeProfileInfo(form.email, form.name, form.password);
    };

    return (
        <>
            <AppHeader />
            <main className={styles.profile_container}>
                <section className={styles.profile_navbar}>
                    <ul>
                        <li>
                            <Link to="/profile">
                                <span className={`text text_type_main-medium ${pathname !== '/profile' && "text_color_inactive"}`}>
                                    Профиль
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <span className={`text text_type_main-medium ${pathname !== '/profile/orders' && "text_color_inactive"}`}>
                                    История заказов
                                </span>
                            </Link>
                        </li>
                        <li onClick={logout}>
                            <Link to="/">
                                <span
                                    className='text text_type_main-medium mt-6 text_color_inactive cursor_pointer'
                                    onClick={logout}
                                >
                                    Выход
                                </span>
                            </Link>
                        </li>
                    </ul>
                    <p className="text text_type_main-default text_color_inactive mt-30">
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </section>
                <section className={styles.profile_content}>
                    <form onSubmit={changeProfile} className={styles.profile_form}>
                        <div className={styles.profile_input}>
                            <Input
                                icon={'EditIcon'}
                                name="email"
                                type="text"
                                placeholder="Логин"
                                value={form.email || ""}
                                onChange={onChange} />
                        </div>
                        <div className={styles.profile_input}>
                            <Input
                                icon={'EditIcon'}
                                name="name"
                                type="text"
                                placeholder="Имя"
                                value={form.name || ""}
                                onChange={onChange} />
                        </div>
                        <div className={styles.profile_input}>
                            <Input
                                icon={'EditIcon'}
                                name="password"
                                type="password"
                                placeholder="Пароль"
                                value={form.password || ""}
                                onChange={onChange} />
                        </div>


                        <div>
                            <Button className="mt-6" type="primary" size="medium" disabled={!!loading}>
                                {loading ? "Загрузка" : "Сохранить"}
                            </Button>
                        </div>
                    </form>
                </section>
            </main>
        </>
    )
}