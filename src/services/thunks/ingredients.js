import {
    getIngredientsLoading, getIngredientsSuccess, getIngredientsError,
    orderLoading, orderReceived, orderError
} from '../slices';
import { getIngredientsData, getOrder, refreshTokens } from "../../utils/api-burger";
import { getAuthToken } from "../../utils/token";

export const fetchIngredients = () => async (dispatch) => {
    dispatch(getIngredientsLoading());
    await getIngredientsData()
        .then((data) => {
            dispatch(getIngredientsSuccess(data));
        })
        .catch((e) => {
            dispatch(getIngredientsError(e.message));
            console.error(e);
        });
}

export const fetchCreateOrder = (ingredients) => async (dispatch) => {
    dispatch(orderLoading());
    await refreshTokens()
    await getOrder(getAuthToken(), ingredients)
        .then((data) => {
            dispatch(orderReceived(data));
        })
        .catch((e) => {
            dispatch(orderError(e.message));
            console.error(e);
        });
}