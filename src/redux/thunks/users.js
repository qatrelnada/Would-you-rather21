import { showLoading, hideLoading } from 'react-redux-loading';
import { _addUser } from './../../utils/_DATA';
import { addUser } from './../actions/users';

export function handleAddUser (firstName, lastName, img) {
    return async function (dispatch) {
        dispatch(showLoading());

        const user = await _addUser(firstName, lastName, img);

        dispatch(addUser(user));
        dispatch(hideLoading());
    }
}
