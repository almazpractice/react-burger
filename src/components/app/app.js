import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {
    ConstructorPage, LoginPage, RegisterPage, ResetPasswordPage, ForgotPasswordPage,
    NotFound404, ProfilePage, OrdersList, WrapperPage
} from '../../pages'
import { getRefreshToken } from "../../utils/token";
import {fetchTokenUser, fetchGetProfileInfo, fetchIngredients} from "../../services/thunks";
import { ProtectedRoute } from "../../utils/protected-route";
import { Preloader } from "../preloader/preloader";
import {authIsChecked, setSelectedIngredient} from "../../services/slices";
import IngredientDetails from "../burger-ingredients/ingredient-details/ingredient-details";
import Modal from "../modal/modal";


const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const { loading, user, isAuthenticated, canChangePassword } = useSelector(state => state.user)

    const background = location.state && location.state.background



    useEffect(() => {
        dispatch(fetchIngredients());
        const refreshToken = getRefreshToken();
        if (refreshToken) {
            dispatch(fetchTokenUser(refreshToken));
        }
    }, [dispatch])

    useEffect(() => {
        if (isAuthenticated && user.name === void 0) {
            dispatch(fetchGetProfileInfo())
        } else {
            dispatch(authIsChecked());
        }
    }, [user, loading, isAuthenticated])

    const closeDetailModal = () => {
        dispatch(setSelectedIngredient({}))
        // toggleDetailView();
        history.goBack()
    }

    if ( loading ) {
        return (
            <WrapperPage>
                <Preloader />
            </WrapperPage>
        )
    }

    return(
        <>
            <Switch location={ background || location }>

                <Route path="/orders" exact={true} component={OrdersList}></Route>

                <ProtectedRoute path="/profile/*">
                    <ProfilePage />
                </ProtectedRoute>

                <ProtectedRoute onlyUnAuth={true} path="/login" exact>
                    <LoginPage />
                </ProtectedRoute>
                <ProtectedRoute onlyUnAuth={true} path="/register" exact>
                    <RegisterPage />
                </ProtectedRoute>
                <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact>
                    <ForgotPasswordPage />
                </ProtectedRoute>
                <ProtectedRoute onlyUnAuth={canChangePassword} path="/reset-password" exact>
                    <ResetPasswordPage />
                </ProtectedRoute>
                <Route path="/ingredients/:id" exact>
                    <WrapperPage>
                        <IngredientDetails />
                    </WrapperPage>
                </Route>

                <Route path="/" exact={true} component={ConstructorPage}></Route>
                <Route path="*" component={NotFound404}></Route>
            </Switch>
            { background && (
                <Route
                    path="/ingredients/:id"
                    children={
                        <Modal onClose={closeDetailModal} header={"Детали ингредиента"}>
                            <IngredientDetails />
                        </Modal>
                    }
                />
            )}
        </>
    );
}


export  default App;