import {
    changeProfileInfo, getProfileInfo, forgotPassword, resetPassword,
    userError, userLoading, userLogin, userLogout, authIsChecked,
} from "../slices";
import {
    changeProfileRequest, getProfileInfoRequest, forgotPasswordRequest, loginRequest,
    logoutRequest, registerRequest, resetPasswordRequest, refreshTokens
} from "../../utils/api-burger";
import { clearTokens, getAuthToken, getRefreshToken, saveTokens } from "../../utils/token";
import { fetchTokenUser } from "./token";

export const fetchRegister = (name, email, password) => async (dispatch) => {
    dispatch(userLoading());
    await registerRequest(name, email, password)
        .then((data) => {
            dispatch(userLogin(data.user));
            saveTokens(data.accessToken, data.refreshToken);
        })
        .catch((ex) => {
            dispatch(userError(ex.message));
            console.error(ex);
        });
}

export const fetchLogin = (email, password) => async (dispatch) => {
    dispatch(userLoading());
    await loginRequest(email, password)
        .then((data) => {
            dispatch(userLogin(data.user));
            saveTokens(data.accessToken, data.refreshToken);
        })
        .catch((ex) => {
            console.error(ex);
            dispatch(userError(ex.message));
        });
}

export const fetchLogout = () => async (dispatch) => {
    dispatch(userLoading());
    await logoutRequest(getRefreshToken())
        .then(() => {
            dispatch(userLogout());
            clearTokens();
        })
        .catch((ex) => {
            console.error(ex);
            dispatch(userError(ex.message));
        });
}

export const fetchForgotPasswordUser = (email) => async (dispatch) => {
    dispatch(userLoading());
    await forgotPasswordRequest(email)
        .then(() => {
            dispatch(forgotPassword());
        })
        .catch((ex) => {
            console.error(ex);
            dispatch(userError(ex.message));
        });
}

export const fetchResetPasswordUser = (password, code) => async (dispatch) => {
    dispatch(userLoading());
    await resetPasswordRequest(password, code)
        .then(() => {
            dispatch(resetPassword());
        })
        .catch((ex) => {
            console.error(ex);
            dispatch(userError(ex.message));
        });
}

export const fetchChangeProfileInfo = (email, name, password) => async (dispatch) => {
    dispatch(userLoading());
    await refreshTokens()
    await changeProfileRequest(getAuthToken(), email, name, password)
        .then((data) => {
            dispatch(changeProfileInfo(data.user));
        })
        .catch((ex) => {
            console.error(ex);
            dispatch(userError(ex.message));
        });
}

export const fetchGetProfileInfo = () => async  (dispatch) => {
    dispatch(userLoading());
    await getProfileInfoRequest(getAuthToken())
        .then(data => {
            dispatch(getProfileInfo(data.user))
        })
        .catch(ex => {
            console.log(ex);
            console.log("Refreshing token...")
            dispatch(fetchTokenUser()).then(() => this)

            dispatch(userError(ex.message))

        })
        .finally(() => {
            dispatch(authIsChecked());
        })

}