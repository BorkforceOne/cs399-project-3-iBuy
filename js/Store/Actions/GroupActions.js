/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_GROUP, REMOVE_GROUP } from '../ActionTypes';

let nextGroupId = -1;
export function addGroup(group, id=nextGroupId--) {
    group.Id = id;
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
