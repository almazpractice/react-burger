import { combineReducers } from "redux";
import {ingredientsReducer, orderReducer, tokenReducer, usersReducer} from "../slices";

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    user: usersReducer,
    token: tokenReducer
})
