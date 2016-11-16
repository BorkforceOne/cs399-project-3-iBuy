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
    let newState = _.cloneDeep(state);
    switch (action.type) {
        case ADD_USER:
            newState[action.user.Id] = action.user;
            return newState;
        case REMOVE_USER:
            delete newState[action.user.Id];
            return newState;
    }
    return state;
};

export default {
    userState: userReducer
};