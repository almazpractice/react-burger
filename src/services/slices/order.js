import {createSlice} from "@reduxjs/toolkit";

const orderInitialState = {
    loading: false,
    order: [],
    error: ''
};

const orderSlice = createSlice({
    name: 'order',
    initialState: orderInitialState,
    reducers: {
        orderLoading: (state) => {
            state.loading = true;
            state.order = [];
            state.error = '';
        },

        orderReceived: (state, action) => {
            state.loading = false;
            state.order = action.payload;
            state.error = '';
        },

        orderError: (state, action) => {
            state.loading = false;
            state.order = [];
            state.error = action.payload;
        },
    }
})


export const {
    orderLoading,
    orderReceived,
    orderError
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;