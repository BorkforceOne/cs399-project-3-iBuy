
import _ from 'lodash';
import { createSelector } from 'reselect';
import Moment from 'moment';

export const getItems = (state) => state.itemState;

const getFilterFromRoute = (state, props) => props.route.filter;

const getItemsFromTimespan = (items, timespan) => {
    return Object.keys(items)
        .filter( key => Moment(Moment(items[key].Due)).diff() < timespan )
        .reduce( (res, key) => (res[key] = items[key], res), {} );
};

export const makeGetItemsFromFilter = () => {
    return createSelector(
        [ getItems, getFilterFromRoute ],
        (items, filter) => {
            let type = filter ? filter.Type : "ALL";
            switch (type) {
                case 'BY_GROUP':
                    return Object.keys(items)
                        .filter( key => items[key].GroupId == filter.GroupId)
                        .reduce( (res, key) => (res[key] = items[key], res), {} );
                case 'BY_RANGE':
                    return getItemsFromTimespan(items, filter.Range);
                case 'ALL':
                default:
                    return items;
            }
        }
    );
};

export const makeGetItemsFromTimespan = (timespan) => {
    return createSelector(
        [ getItems ],
        (items) => {
            return getItemsFromTimespan(items, timespan);
        }
    )
};