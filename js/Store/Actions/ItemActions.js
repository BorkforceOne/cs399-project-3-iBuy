/**
 * Created by Brandon Garling on 11/14/2016.
 */
import { ADD_ITEM, REMOVE_ITEM, UPDATE_ITEM } from '../ActionTypes';

export function addItem(item) {
    return {
        type: ADD_ITEM,
        item: item
    }
}

export function removeItem(item) {
    return {
        type: REMOVE_ITEM,
        item: item
    }
}

export function updateItem(updatedEntity) {
    return {
        type: UPDATE_ITEM,
        item: updatedEntity
    }
}