/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from '../ActionTypes';
import { parseRESTResponse, handleRESTErrors} from '../../Utils/RESTHelpers';
import { ServerURL } from '../../Config';

export function addItem(item) {
    return {
        type: ADD_ITEM,
        item: item
    }
}

export function removeItem(item) {
    return {
        type: REMOVE_ITEM,
        item: item
    }
}

export function updateItem(updatedEntity, id) {
    return {
        type: UPDATE_ITEM,
        item: updatedEntity,
        id: id
    }
}

export function remoteGetItems() {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/items`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                const state = getState();

                for (let i = 0; i < json.length; i++) {
                    if (state[json[i].Id] === undefined)
                        dispatch(addItem(json[i]));
                    else
                        dispatch(updateItem(json[i]));
                }

                for (let id in state) {
                    id = parseInt(id);
                    if (id > 0) {
                        let found = false;
                        for (let i = 0; i < json.length; i++) {
                            if (json[i].Id == id) {
                                found = true;
                                break;
                            }
                        }
                        if (!found)
                            dispatch(removeItem(state[id]));
                    }
                }
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    };
}

export function remoteAddItem(item) {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/items`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                const state = getState().itemState;

                if (state[item.Id] !== undefined)
                    dispatch(updateItem(json, item.Id));
                else
                    dispatch(addItem(json));
                
                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    };
}

export function remoteUpdateItem(item) {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/items/${item.Id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                const state = getState();

                if (state[item.Id] !== undefined)
                    dispatch(updateItem(json));

                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    };
}

export function remoteRemoveItem(item) {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/items/${item.Id}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                const state = getState();

                if (state[item.Id] !== undefined)
                    dispatch(removeItem(item));

                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    }
}