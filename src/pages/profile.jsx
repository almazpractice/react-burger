import React, {useCallback, useEffect, useState} from "react";
import {Link, Route, Switch, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import  styles from './auth.module.css'
import { fetchChangeProfileInfo, fetchLogout } from "../services/thunks";
import AppHeader from "../components/app-header/app-header";
import {PasswordInput} from "../components/password-input/password-input";

const ProfileOrders = () => {
    return (
        <span className="text text_type_main-medium ml-30">
            Page in development
        </span>
    )
}

const ProfileInfo = () => {
    const dispatch = useDispatch();
    const { loading, user } = useSelector(state => state.user);
    const [ form, setValue] = useState({ email: "", name: "", password: "" });
    const [ isChanged, setIsChanged ] = useState(false)

    useEffect(() => {
        setValue({ email: user.email, name: user.name, password: "" })
    }, [])

    useEffect(() => {
        if (form.email === user.email &&  form.name === user.name ) {
            setIsChanged(false)
        }  else {
            setIsChanged(true)
        }
    }, [form])

    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const changeProfile = async (e) => {
        e.preventDefault();
        dispatch(fetchChangeProfileInfo(form.email, form.name, form.password))
    };

    const handleCancel = async (e) => {
        e.preventDefault();
        setValue({ ...form, "name": user.name, "email": user.email });
    }


    return (
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
                <PasswordInput
                    icon={'EditIcon'}
                    name="password"
                    value={ form.password || ""}
                    onChange={onChange}
                    placeholder="Пароль"
                />
            </div>


            <div>
                { isChanged && (
                    <>
                        <Button className="mt-6 mr-10" type="secondary" size="medium" disabled={!!loading} onClick={handleCancel}>
                            {loading ? "Загрузка" : "Отмена"}
                        </Button>
                        <Button className="mt-6 ml-2" type="primary" size="medium" disabled={!!loading}>
                            {loading ? "Загрузка" : "Сохранить"}
                        </Button>
                    </>
                )}
            </div>
        </form>
    )
}


export const ProfilePage = () => {
    const dispatch = useDispatch();
    const pathname = useLocation().pathname;

    const logout = useCallback((e) => {
        dispatch(fetchLogout());
    }, [dispatch]);

    return (
        <>
            <AppHeader />
            <main className={styles.profile_container}>
                <section className={styles.profile_navbar}>
                    <ul>
                        <li>
                            <Link to="/profile/">
                                <span className={`text text_type_main-medium ${pathname !== '/profile/' && "text_color_inactive"}`}>
                                    Профиль
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile/orders/">
                                <span className={`text text_type_main-medium ${pathname !== '/profile/orders/' && "text_color_inactive"}`}>
                                    История заказов
                                </span>
                            </Link>
                        </li>
                        <li onClick={logout}>
                            <Link to="/login">
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
                    <Switch>
                        <Route path="/profile/" exact={true} component={ProfileInfo}/>
                        <Route path="/profile/orders/" exact={true} component={ProfileOrders}/>
                    </Switch>
                </section>
            </main>
        </>
    )
}