import { showLoading, hideLoading } from 'react-redux-loading';
import { _authedUser } from "../../utils/_DATA";
import { setAuthedUser } from '../actions/authedUser';

export function handleSetAuthedUser (id) {
    return async function (dispatch) {
        dispatch(showLoading());

        await _authedUser(id);

        dispatch(setAuthedUser(id));
        dispatch(hideLoading());
    }
}