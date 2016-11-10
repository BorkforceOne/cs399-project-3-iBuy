import { combineReducers } from 'redux';
import _ from 'lodash';

let nextItemId = -1;
export const itemReducer = function (state = {}, action) {
   if (action.type === 'ADD_ITEM') {
       let newState = _.cloneDeep(state);
       action.item.id = nextItemId++;
       newState[action.item.id] = action.item;
       return newState;
   }
   return state;
};

let nextGroupId = -1;
export const groupReducer = function (state = {}, action) {
    if (action.type === 'ADD_GROUP') {
        let newState = _.cloneDeep(state);
        action.group.id = nextGroupId++;
        newState[action.group.id] = action.group;
        return newState;
    }
    return state;
};

let nextUserId = -1;
export const userReducer = function (state = {}, action) {
    if (action.type === 'ADD_USER') {
        let newState = _.cloneDeep(state);
        action.user.id = nextUserId--;
        newState[action.user.id] = action.user;
        return newState;
    }
    return state;
};

export default Reducers = combineReducers({
    itemState: itemReducer,
    groupState: groupReducer,
    userReducer: userReducer
});