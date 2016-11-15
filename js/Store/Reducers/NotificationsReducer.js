/**
 * Created by Brandon Garling on 11/14/2016.
 */
import _ from 'lodash';
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../ActionTypes';

/**
 *
 * @param state
 * @param {{type: String, notification: Notification}} action
 * @returns {*}
 */
export const notificationReducer = function (state = {}, action) {
    let newState = _.cloneDeep(state);
    switch (action.type) {
        case ADD_NOTIFICATION:
            newState[action.notification.Id] = action.notification;
            return newState;
        case REMOVE_NOTIFICATION:
            delete newState[action.notification.Id];
            return newState;
    }
    return state;
};

export default {
    notificationState: notificationReducer
};