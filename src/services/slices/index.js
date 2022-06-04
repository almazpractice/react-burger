import {
    getIngredientsLoading, getIngredientsSuccess, getIngredientsError, increaseIngredient,
    decreaseIngredient, addIngredient, removeIngredient, setSelectedIngredient, setTotalPrice,
    moveIngredient, ingredientsReducer
} from './ingredients'

import { orderLoading, orderReceived, orderError, orderReducer } from './order'

import {
    userLoading, userLogin, userLoginByToken, userLogout, userError, forgotPassword,
    resetPassword, changeProfileInfo, getProfileInfo, usersReducer
} from './user'

import { tokenLoading, tokenSuccess, tokenError, tokenReducer } from './token'



export {
    getIngredientsLoading, getIngredientsSuccess, getIngredientsError, increaseIngredient,
    decreaseIngredient, addIngredient, removeIngredient, setSelectedIngredient, setTotalPrice,
    moveIngredient,

    orderLoading, orderReceived, orderError,

    userLoading, userLogin, userLoginByToken, userLogout, userError, forgotPassword,
    resetPassword, changeProfileInfo, getProfileInfo,

    tokenLoading, tokenSuccess, tokenError
}
export { ingredientsReducer, orderReducer, usersReducer, tokenReducer }
