/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_GROUP, REMOVE_GROUP, UPDATE_GROUP } from '../ActionTypes';
import { parseRESTResponse, handleRESTErrors} from '../../Utils/RESTHelpers';
import { ServerURL } from '../../Config';

export function addGroup(group) {
    return {
        type: ADD_GROUP,
        group: group
    }
}

export function removeGroup(id) {
    return {
        type: REMOVE_GROUP,
        id
    }
}

export function updateGroup(updatedEntity) {
    return {
        type: UPDATE_GROUP,
        group: updatedEntity,
        id: id
    }
}

export function remoteGetGroups() {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/groups`,
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
                const state = getState().groupState;

                for (let i = 0; i < json.length; i++) {
                    if (state[json[i].Id] === undefined)
                        dispatch(addGroup(json[i]));
                    else
                        dispatch(updateGroup(json[i]));
                }
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    };
}

export function remoteAddGroup(group) {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/groups`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(group)
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                const state = getState().groupState;

                if (state[group.Id] !== undefined)
                    dispatch(updateGroup(json, group.Id));
                else
                    dispatch(addGroup(json));
                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    };
}

export function remoteUpdateGroup(group) {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/groups/${group.Id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(group)
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                const state = getState().groupState;

                if (state[group.Id] !== undefined)
                    dispatch(updateGroup(json));

                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    };
}

export function remoteRemoveGroup(group) {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/groups/${group.Id}`,
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
                const state = getState().groupState;

                if (state[group.Id] !== undefined)
                    dispatch(removeGroup(group));

                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    }
}