import { combineReducers } from "redux";
import { ingredientsReducer, orderReducer } from "../slices";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
})
