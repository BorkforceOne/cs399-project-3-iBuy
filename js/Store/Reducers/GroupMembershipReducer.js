/**
 * Created by Brandon Garling on 11/14/2016.
 */
import _ from 'lodash';
import { ADD_MEMBERSHIP, REMOVE_MEMBERSHIP } from '../ActionTypes';

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

export default {
    membershipState: membershipReducer
};