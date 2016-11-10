import { ADD_ITEM, ADD_GROUP, ADD_USER,
    REMOVE_ITEM, REMOVE_GROUP, REMOVE_USER} from './ActionTypes';

let nextItemId = -1;
export function addItem(item, id=nextItemId--) {
    item.Id = id;
    return {
        type: ADD_ITEM,
        item: item
    }
}

let nextGroupId = -1;
export function addGroup(group, id=nextGroupId--) {
    group.Id = id;
    return {
        type: ADD_GROUP,
        group: group
    }
}

let nextUserId = -1;
export function addUser(user, id=nextUserId--) {
    user.Id = id;
    return {
        type: ADD_USER,
        user: user
    }
}

export function removeItem(id) {
    return {
        type: REMOVE_ITEM,
        id
    }
}

export function removeGroup(id) {
    return {
        type: REMOVE_GROUP,
        id
    }
}

export function removeUser(id) {
    return {
        type: REMOVE_USER,
        id
    }
}

export default Reducers = {
    addItem: addItem,
    addUser: addUser,
    addGroup: addGroup,
    removeItem: removeItem,
    removeGroup: removeGroup,
    removeUser: removeUser
};

