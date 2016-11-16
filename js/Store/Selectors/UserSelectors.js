
import _ from 'lodash';
import { createSelector } from 'reselect';
import { getMemberships } from './MembershipSelectors';

const getRawUsers = (state) => state.userState;

export const getUsers = createSelector(
    [ getRawUsers, getMemberships ],
    (getUsers, memberships) => {
        let users = _.cloneDeep(getUsers);
        for (let id in users) {
            let user = users[id];
            user.GroupIds = Object.values(memberships)
                .filter(membership => membership.UserId === user.Id)
                .map(membership => membership.GroupId);
        }
        return users;
    }
);
