import {
    ADD_ITEM, ADD_GROUP, ADD_USER,
    REMOVE_ITEM, REMOVE_GROUP, REMOVE_USER,
    UPDATE_ITEM, ADD_MEMBERSHIP, REMOVE_MEMBERSHIP,
    UPDATE_GROUP
} from './ActionTypes';

export function addItem(item) {
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

export function updateGroup(updatedEntity) {
    return {
        type: UPDATE_GROUP,
        group: updatedEntity
    }
}

export function removeUser(id) {
    return {
        type: REMOVE_USER,
        id
    }
}

export function updateItem(updatedEntity) {
    return {
        type: UPDATE_ITEM,
        item: updatedEntity
    }
}

let nextMembershipId = -1;
export function addMembership(membership, id=nextMembershipId--) {
    membership.Id = id;
    return {
        type: ADD_MEMBERSHIP,
        membership
    }
}

export function removeMembership(id) {
    return {
        type: REMOVE_MEMBERSHIP,
        id
    }
}


export default Reducers = {
    addItem: addItem,
    addUser: addUser,
    addGroup: addGroup,
    removeItem: removeItem,
    removeGroup: removeGroup,
    removeUser: removeUser,
    updateItem: updateItem,
    updateGroup: updateGroup
};

