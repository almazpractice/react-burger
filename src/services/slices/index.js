import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import {v4} from "uuid";

const ingredientsInitialState = {
    loading: false,
    error: '',
    ingredients: [],

    cart: [],

    selectedIngredient: {},
    totalPrice: 0
};

const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: ingredientsInitialState,
    reducers: {
        getIngredientsLoading: (state) => {
            state.loading = true;
            state.ingredients = [];
            state.error = '';
        },

        getIngredientsSuccess: (state, action) => {
            state.loading = false;
            state.ingredients = action.payload;
            state.error = '';
        },

        getIngredientsError: (state, action) => {
            state.loading = false;
            state.ingredients = [];
            state.error = action.payload;
        },
        increaseIngredient: (state, action) => {
            state.ingredients.map(item => {
                if (item._id === action.payload._id) {
                    if (item.type === 'bun') {
                        item.__v = 2
                    } else {
                        ++item.__v
                    }
                } else {
                    if (item.type === 'bun' && action.payload.type === 'bun') {
                        item.__v = 0
                    }
                } return item
            })
        },
        decreaseIngredient: (state, action) => {
            state.ingredients.map(item => {
                if (item._id === action.payload._id && item.type !== 'bun' && item.__v > 0) {
                    --item.__v
                } return item
            })
        },
        addIngredient: (state, action) => {
            const ingredientCopy = _.cloneDeep(action.payload)
            ingredientCopy.uuid = v4()

            state.cart = (action.payload.type !== 'bun'
                ? ([
                    ...state.cart,
                    ingredientCopy,
                ])
                : ([
                    ingredientCopy,
                    ingredientCopy,
                    ...state.cart.filter(x => x &&  x.type !== 'bun'),
                ]));
        },
        removeIngredient: (state, action) => {
            state.cart = [
                ...state.cart.filter(x => x.uuid !== action.payload),
            ];
        },
        setSelectedIngredient: (state, action) => void(state.selectedIngredient = action.payload),
        setTotalPrice: (state, action) => void(state.totalPrice = action.payload),
        moveIngredient: (state, action) => {
            const buns = JSON.parse(JSON.stringify(state.cart)).filter(x => x.type === 'bun');
            const notBuns = JSON.parse(JSON.stringify(state.cart)).filter(x => x.type !== 'bun');
            const { current, target } = action.payload;
            if (current > target) {
                notBuns.splice(target, 2, notBuns[current], notBuns[target])
            } else {
                notBuns.splice(current, 2, notBuns[target], notBuns[current])
            }
            state.cart = [...buns, ...notBuns];
        },
    }
})


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
    getIngredientsLoading,
    getIngredientsSuccess,
    getIngredientsError,
    increaseIngredient,
    decreaseIngredient,
    addIngredient,
    removeIngredient,
    setSelectedIngredient,
    setTotalPrice,
    moveIngredient
} = ingredientsSlice.actions;
export const ingredientsReducer = ingredientsSlice.reducer;


export const {
    orderLoading,
    orderReceived,
    orderError
} = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
