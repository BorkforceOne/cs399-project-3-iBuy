/**
 * Created by Brandon Garling on 11/14/2016.
 */
import _ from 'lodash';
import { ADD_GROUP, REMOVE_GROUP } from '../ActionTypes';

/**
 *
 * @param state
 * @param {{type: String, group: Group}} action
 * @returns {*}
 */
export const groupReducer = function (state = {}, action) {
    if (action.type === ADD_GROUP) {
        let newState = _.cloneDeep(state);
        newState[action.group.Id] = action.group;
        return newState;
    }
    if (action.type === REMOVE_GROUP) {
        let newState = _.cloneDeep(state);
        delete newState[action.Id];
        return newState;
    }
    return state;
};

export default {
    groupState: groupReducer
};