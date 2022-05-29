import {
    getIngredientsLoading,
    getIngredientsSuccess,
    getIngredientsError,
    orderLoading,
    orderReceived,
    orderError
} from '../slices';
import {getIngredientsData, getOrder} from "../../utils/api-burger";

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
    await getOrder(ingredients)
        .then((data) => {
            dispatch(orderReceived(data));
        })
        .catch((e) => {
            dispatch(orderError(e.message));
            console.error(e);
        });
}