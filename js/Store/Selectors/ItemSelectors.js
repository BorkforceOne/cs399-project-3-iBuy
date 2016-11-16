
import _ from 'lodash';
import { createSelector } from 'reselect';
import Moment from 'moment';
import {getSession} from './SessionSelectors';
import {getMemberships} from './MembershipSelectors';

export const getRawItems = createSelector(
    [state => state.itemState, getMemberships, getSession],
    (items, memberships, session) => {
        let outItems = {};
        for (let id in items) {
            let item = items[id];
            for (let mid in memberships) {
                let membership = memberships[mid];
                if (membership.GroupId == item.GroupId && membership.UserId == session.Id) {
                    outItems[id] = item;
                    break;
                }
            }
        }
        return outItems;
    }
);
export const getItems = createSelector(
    [getRawItems],
    (items) => {
        return Object.keys(items)
            .sort((a, b) => {
                let ea = items[a];
                let eb = items[b];
                if (ea.Completed && !eb.Completed)
                    return 1;
                if (eb.Completed && !ea.Completed)
                    return -1;

                if (ea.Due < eb.Due)
                    return -1;
                if (ea.Due > eb.Due)
                    return 1;
                return 0;
            })
            .reduce( (res, key) => (res[key] = items[key], res), {} );
    }
);

const getFilterFromRoute = (state, props) => props.route.filter;

const getItemsFromTimespan = (items, timespan) => {
    return Object.keys(items)
        .filter( key => Moment(Moment(items[key].Due)).diff() < timespan )
        .reduce( (res, key) => (res[key] = items[key], res), {} );
};

const hideCompletedTasks = (items) => {
    return Object.keys(items)
        .filter( key => !items[key].Completed )
        .reduce( (res, key) => (res[key] = items[key], res), {} );
};

export const makeGetItemsFromFilter = () => {
    return createSelector(
        [ getItems, getFilterFromRoute ],
        (items, filter) => {
            let type = filter ? filter.Type : "ALL";
            if (!filter || !filter.ShowCompleted)
                items = hideCompletedTasks(items);
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