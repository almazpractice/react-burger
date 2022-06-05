import { saveTokens, clearTokens } from '../../utils/token';
import { userLoginByToken, tokenLoading, tokenSuccess, tokenError } from '../slices';
import { tokenUser } from "../../utils/api-burger";

export const fetchTokenUser = (refreshToken) => async (dispatch) => {
  dispatch(tokenLoading());
  await tokenUser()
    .then((data) => {
      dispatch(tokenSuccess());
      saveTokens(data.accessToken, data.refreshToken);
      dispatch(userLoginByToken());
    })
    .catch((ex) => {
      console.error(ex);
      dispatch(tokenError(ex.message));
      clearTokens();
    });
}