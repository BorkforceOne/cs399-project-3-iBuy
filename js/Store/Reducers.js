import { combineReducers } from 'redux';
import _ from 'lodash';
import {
    ADD_ITEM, ADD_GROUP, ADD_USER,
    REMOVE_ITEM, REMOVE_GROUP, REMOVE_USER,
    UPDATE_ITEM, ADD_MEMBERSHIP, REMOVE_MEMBERSHIP,
    UPDATE_GROUP
} from './ActionTypes';

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

/**
 *
 * @param state
 * @param {{type: String, membership: GroupMembership}} action
 * @returns {*}
 */
export const membershipReducer = function(state = {}, action) {
    let newState = _.cloneDeep(state);
    switch(action.type) {
        case ADD_MEMBERSHIP:
            newState[action.membership.Id] = action.membership;
            return newState;
        case REMOVE_MEMBERSHIP:
            delete newState[action.membership.Id];
            return newState;
    }
    return state;
};

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

export default Reducers = combineReducers({
    itemState: itemReducer,
    groupState: groupReducer,
    userState: userReducer,
    membershipState: membershipReducer
});