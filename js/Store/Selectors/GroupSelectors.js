
import _ from 'lodash';
import { createSelector } from 'reselect';
import { getMemberships } from './MembershipSelectors';
import { getItems } from './ItemSelectors';

const getRawGroups = (state) => state.groupState;

export const getGroups = createSelector(
    [ getRawGroups, getMemberships, getItems ],
    (rawGroups, memberships, items) => {
        let groups = _.cloneDeep(rawGroups);
        for (let id in groups) {
            let group = groups[id];
            group.UserIds = Object.values(memberships)
                .filter(membership => membership.GroupId == group.Id)
                .map(membership => membership.UserId);
            group.ItemIds = Object.values(items)
                .filter(item => item.GroupId == group.Id)
                .map(item => item.Id);
        }
        return groups;
    }
);
