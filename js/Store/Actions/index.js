import _ from 'lodash';
import * as ItemActions from './ItemActions';
import * as UserActions from './UserActions';
import * as GroupActions from './GroupActions';
import * as GroupMembershipActions from './GroupMembershipActions';

export default _.merge(ItemActions, UserActions, GroupActions, GroupMembershipActions);