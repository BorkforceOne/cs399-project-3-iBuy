/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_USER, REMOVE_USER} from '../ActionTypes';
import { parseRESTResponse, handleRESTErrors} from '../../Utils/RESTHelpers';

export function addUser(user) {
    return {
        type: ADD_USER,
        user: user
    }
}

export function removeUser(id) {
    return {
        type: REMOVE_USER,
        id
    }
}

export function createUser(user) {

    return function (dispatch) {

        return fetch(`http://10.24.70.13:4300/api/v1/users`,
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
                    addUser(json);
                    return json;
                }
            )
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    }
}