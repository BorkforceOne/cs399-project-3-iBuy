/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_MEMBERSHIP, REMOVE_MEMBERSHIP, MODIFY_MEMBERSHIP } from '../ActionTypes';
import { parseRESTResponse, handleRESTErrors} from '../../Utils/RESTHelpers';
import { ServerURL } from '../../Config';

export function addMembership(membership) {
    return {
        type: ADD_MEMBERSHIP,
        membership
    }
}

export function removeMembership(membership) {
    return {
        type: REMOVE_MEMBERSHIP,
        membership
    }
}

export function updateMembership(updatedEntity) {
    return {
        type: MODIFY_MEMBERSHIP,
        updatedEntity
    }
}

export function remoteGetMemberships() {
    return function (dispatch, getState) {

        return fetch(`${ServerURL}/api/v1/group-memberships`,
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
                        dispatch(addMembership(json[i]));
                    else
                        dispatch(updateMembership(json[i]));
                }

                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    }
}

export function remoteAddMembership(membership) {
    return function (dispatch, getState) {
        return fetch(`${ServerURL}/api/v1/group-memberships`,
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
                const state = getState();

                if (state[membership.Id] !== undefined)
                    dispatch(updateMembership(json));
                else
                    dispatch(addMembership(json));
                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    }
}

export function remoteRemoveMembership(membership) {
    return function (dispatch, getState) {
        return fetch(`${ServerURL}/api/v1/group-memberships/${membership.Id}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(membership)
            })
            .then(response => response.json())
            .then(json => parseRESTResponse(json))
            .then(json => {
                const state = getState();

                if (state[group.Id] !== undefined)
                    dispatch(removeMembership(membership));

                return json;
            })
            .catch(error => {
                handleRESTErrors(dispatch, error);
                throw error;
            });
    }
}