import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
    loading: false,
    isAuthChecked: false,
    isAuthenticated: false,
    user: {},
    error: '',
    canChangePassword: false
}
const userSlice = createSlice({
    name: 'user',
    initialState: userInitialState,
    reducers: {
        userLoading: (state) => {
            state.loading = true;
            state.error = '';
        },
        userLogin: (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = '';
        },
        userLoginByToken: (state) => {
            state.isAuthenticated = true;
            state.error = '';
        },
        userLogout: (state) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = '';
        },
        userError: (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
            state.canChangePassword = false;
        },
        forgotPassword: (state) => {
            state.loading = false;
            state.canChangePassword = true;
            state.error = '';
        },

        resetPassword: (state) => {
            state.loading = false;
            state.canChangePassword = false;
            state.error = '';
        },
        changeProfileInfo: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = '';
        },
        getProfileInfo: (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = '';
        },
        authIsChecked: (state) => void ( state.isAuthChecked = true ),
        authIsNotChecked: (state) => void ( state.isAuthChecked = false )
    }
})

export const {
    userLoading,
    userLogin,
    userLoginByToken,
    userLogout,
    userError,
    forgotPassword,
    resetPassword,
    changeProfileInfo,
    getProfileInfo,
    authIsChecked
} = userSlice.actions;
export const usersReducer = userSlice.reducer;