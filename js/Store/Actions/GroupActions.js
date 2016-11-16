/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_GROUP, REMOVE_GROUP, UPDATE_GROUP } from '../ActionTypes';

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
        group: updatedEntity
    }
}