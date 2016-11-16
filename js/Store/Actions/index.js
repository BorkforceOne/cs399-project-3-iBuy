import _ from 'lodash';
import * as ItemActions from './ItemActions';
import * as UserActions from './UserActions';
import * as GroupActions from './GroupActions';
import * as GroupMembershipActions from './GroupMembershipActions';
import * as NotificationActions from './NotificationActions';
import * as SessionActions from './SessionActions';

export default _.merge(ItemActions, UserActions, GroupActions, GroupMembershipActions, NotificationActions, SessionActions);