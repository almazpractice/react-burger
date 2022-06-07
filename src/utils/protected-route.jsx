import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Preloader } from "../components/preloader/preloader";
import { WrapperPage } from "../pages";
import PropTypes from "prop-types";


export function ProtectedRoute({ onlyUnAuth = false, ...rest }) {
    const { user, isAuthChecked } = useSelector(state => state.user);
    const location = useLocation();

    if ( !isAuthChecked ) {
        return (
            <WrapperPage>
                <Preloader />
            </WrapperPage>
        )
    }

    if ( onlyUnAuth && user.name !== undefined ) {
        const { from } = location.state || { from: { pathname: "/" } }
        return <Redirect to={from} />
    }

    if ( !onlyUnAuth && user.name === undefined ) {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location },
                }}
            />
        )
    }

    return <Route { ...rest } />
}

ProtectedRoute.propTypes = {
    onlyUnAuth: PropTypes.bool
}