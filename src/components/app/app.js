import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
    ConstructorPage, LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage, NotFound404, ProfilePage, OrdersList
} from '../../pages'
import { getRefreshToken } from "../../utils/token";
import { fetchTokenUser, fetchGetProfileInfo } from "../../services/thunks";


const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
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
            <Switch>
                <Route path="/" exact={true} component={ConstructorPage}>
                    {/*<ConstructorPage />*/}
                </Route>
                <Route path="/login" exact={true} component={LoginPage}>
                    {/*<LoginPage />*/}
                </Route>
                <Route path="/register" exact={true} component={RegisterPage}>
                    {/*<RegisterPage />*/}
                </Route>
                <Route path="/forgot-password" exact={true} component={ForgotPasswordPage}>
                    {/*<ForgotPasswordPage />*/}
                </Route>
                <Route path="/reset-password" component={ResetPasswordPage}>
                    {/*<ResetPasswordPage />*/}
                </Route>
                <Route path="/profile" component={ProfilePage}>
                    {/*<ProfilePage />*/}
                </Route>
                <Route path="/orders" component={OrdersList}>
                    {/*<OrdersList />*/}
                </Route>
                <Route path="*" component={NotFound404}>
                    {/*<NotFound404 />*/}
                </Route>
            </Switch>
        </>
    );
}


export  default App;