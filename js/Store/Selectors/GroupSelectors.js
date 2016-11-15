
import _ from 'lodash';
import { createSelector } from 'reselect';
import { getMemberships } from './MembershipSelectors';

const getRawGroups = (state) => state.groupState;

export const getGroups = createSelector(
    [ getRawGroups, getMemberships ],
    (rawGroups, memberships) => {
        let groups = _.cloneDeep(rawGroups);
        for (let id in groups) {
            let group = groups[id];
            group.UserIds = Object.values(memberships)
                .filter(membership => membership.GroupId === group.GroupId)
                .map(membership => membership.UserId);
        }
        return groups;
    }
);
