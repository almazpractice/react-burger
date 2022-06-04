import {createSlice} from "@reduxjs/toolkit";

const userInitialState = {
    loading: false,
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
            state.loggedIn = false;
            state.user = {};
            state.error = action.payload;
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
        }
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
    getProfileInfo
} = userSlice.actions;
export const usersReducer = userSlice.reducer;