/**
 * Created by Brandon Garling on 11/14/2016.
 */
import _ from 'lodash';
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from '../ActionTypes';

/**
 *
 * @param state
 * @param {{type: String, item: Item}} action
 * @returns {*}
 */
export const itemReducer = function (state = {}, action) {
    let newState = _.cloneDeep(state);
    switch (action.type) {
        case ADD_ITEM:
            newState[action.item.Id] = action.item;
            return newState;
        case REMOVE_ITEM:
            delete newState[action.Id];
            return newState;
        case UPDATE_ITEM:
            newState[action.item.Id] = _.cloneDeep(action.item);
            return newState;
    }
    return state;
};

export default {
    itemState: itemReducer
};