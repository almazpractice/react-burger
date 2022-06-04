import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {ConstructorPage, LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, NotFound404 } from '../../pages'
import {ProfilePage} from "../../pages/profile";
import {OrdersList} from "../../pages/orders-list";
import {useDispatch, useSelector} from "react-redux";
import {getRefreshToken} from "../../utils/token";
import {fetchTokenUser} from "../../services/thunks/token";
import {fetchGetProfileInfo} from "../../services/thunks/user";


const App = () => {
    const dispatch = useDispatch();
    const { loading, user, isAuthenticated } = useSelector(state => state.user)

    useEffect(() => {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            dispatch(fetchTokenUser(refreshToken));
        }
    }, [dispatch])

    useEffect(() => {
        if (isAuthenticated && user.name === 'undefined') {
            dispatch(fetchGetProfileInfo())
        }
    }, [user, loading, isAuthenticated])

    return(
        <>
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <ConstructorPage />
                </Route>
                <Route path="/login" exact={true}>
                    <LoginPage />
                </Route>
                <Route path="/register" exact={true}>
                    <RegisterPage />
                </Route>
                <Route path="/forgot-password" exact={true}>
                    <ForgotPasswordPage />
                </Route>
                <Route path="/reset-password">
                    <ResetPasswordPage />
                </Route>
                <Route path="/profile">
                    <ProfilePage />
                </Route>
                <Route path="/orders">
                    <OrdersList />
                </Route>
                <Route>
                    <NotFound404 />
                </Route>
            </Switch>
        </Router>
        </>
    );
}


export  default App;