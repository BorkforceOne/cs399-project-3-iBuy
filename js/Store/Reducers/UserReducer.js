/**
 * Created by Brandon Garling on 11/14/2016.
 */
import _ from 'lodash';
import { ADD_USER, REMOVE_USER } from '../ActionTypes';

/**
 *
 * @param state
 * @param {{type: String, user: User}} action
 * @returns {*}
 */
export const userReducer = function (state = {}, action) {
    if (action.type === ADD_USER) {
        let newState = _.cloneDeep(state);
        newState[action.user.Id] = action.user;
        return newState;
    }
    if (action.type === REMOVE_USER) {
        let newState = _.cloneDeep(state);
        delete newState[action.Id];
        return newState;
    }
    return state;
};

export default {
    userState: userReducer
};