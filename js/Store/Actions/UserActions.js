/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_USER, REMOVE_USER} from '../ActionTypes';

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