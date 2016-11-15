/**
 * Created by Brandon Garling on 11/14/2016.
 */
import _ from 'lodash';
import { SET_SESSION, CLEAR_SESSION } from '../ActionTypes';

/**
 *
 * @param state
 * @param {{type: String, state: Object}} action
 * @returns {*}
 */
export const sessionReducer = function (state = {}, action) {
    let newState = _.cloneDeep(state);
    switch (action.type) {
        case SET_SESSION:
            newState = _.merge(newState, action.state);
            return newState;
        case CLEAR_SESSION:
            newState = {};
            return newState;
    }
    return state;
};

export default {
    sessionState: sessionReducer
};