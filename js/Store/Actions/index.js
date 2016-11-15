import _ from 'lodash';
import * as ItemActions from './ItemActions';
import * as UserActions from './UserActions';
import * as GroupActions from './GroupActions';

export default _.merge(ItemActions, UserActions, GroupActions);