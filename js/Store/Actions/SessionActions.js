/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { SET_SESSION, CLEAR_SESSION } from '../ActionTypes';
import { parseRESTResponse, handleRESTErrors} from '../../Utils/RESTHelpers';
import { ServerURL } from '../../Config';

export function setSession(state) {
    return {
        type: SET_SESSION,
        state: state
    }
}

export function clearSession() {
    return {
        type: CLEAR_SESSION
    }
}

export function loginUser(user) {

    return function (dispatch) {

        return fetch(`${ServerURL}/api/v1/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                dispatch(setSession(json));
                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    }
}

export function logoutUser() {
    return function (dispatch) {

        return fetch(`${ServerURL}/api/v1/auth/logout`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                    dispatch(clearSession());
                    return json;
                }
            )
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    }
}