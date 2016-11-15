/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_MEMBERSHIP, REMOVE_MEMBERSHIP } from '../ActionTypes';

export function addMembership(membership) {
    return {
        type: ADD_MEMBERSHIP,
        membership
    }
}

export function removeMembership(id) {
    return {
        type: REMOVE_MEMBERSHIP,
        id
    }
}