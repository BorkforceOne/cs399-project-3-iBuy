/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../ActionTypes';
import Notification from '../../Models/Notification';

export function addNotification(notification) {
    if (notification.constructor !== Notification) {
        let contents = notification;
        notification = new Notification();
        notification.Contents = contents;
    }
    return {
        type: ADD_NOTIFICATION,
        notification: notification
    }
}

export function removeNotification(notification) {
    return {
        type: REMOVE_NOTIFICATION,
        notification: notification
    }
}
