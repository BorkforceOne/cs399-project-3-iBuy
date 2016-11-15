
import _ from 'lodash';
import { createSelector } from 'reselect';

export const getItems = (state) => state.itemState;

const getFilterFromRoute = (state, props) => props.route.filter;

export const makeGetItemsFromFilter = () => {
    return createSelector(
        [ getItems, getFilterFromRoute ],
        (items, filter) => {
            let type = filter ? filter.Type : "ALL";
            switch (type) {
                case 'BY_GROUP':
                    return Object.keys(items)
                        .filter( key => items[key].GroupId === filter.GroupId)
                        .reduce( (res, key) => (res[key] = items[key], res), {} );
                case 'BY_DATE_RANGE':
                    // TODO: make this work
                    return items;
                case 'ALL':
                default:
                    return items;
            }
        }
    );
};
