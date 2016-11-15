/**
 * Created by Brandon Garling on 11/14/2016.
 */
import _ from 'lodash';
import { ADD_GROUP, REMOVE_GROUP, UPDATE_GROUP } from '../ActionTypes';

/**
 *
 * @param state
 * @param {{type: String, group: Group}} action
 * @returns {*}
 */
export const groupReducer = function (state = {}, action) {
    let newState = _.cloneDeep(state);
    switch (action.type) {
        case ADD_GROUP:
            newState[action.group.Id] = action.group;
            return newState;
        case REMOVE_GROUP:
            delete newState[action.group.Id];
            return newState;
        case UPDATE_GROUP:
            newState[action.group.Id] = _.cloneDeep(action.group);
            return newState;

    }
    return state;
};

export default {
    groupState: groupReducer
};