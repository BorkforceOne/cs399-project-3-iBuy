/**
 * Created by Brandon Garling on 11/14/2016.
 */
import _ from 'lodash';
import { combineReducers } from 'redux';
import ItemReducer from './ItemReducer';
import UserReducer from './UserReducer';
import GroupReducer from './GroupReducer';
import GroupMembershipReducer from './GroupMembershipReducer';
import NotificationsReducer from './NotificationsReducer'
import SessionReducer from './SessionReducer';

const reducers = _.merge(ItemReducer, UserReducer, GroupReducer, GroupMembershipReducer, NotificationsReducer, SessionReducer);

export default Reducers = combineReducers(reducers);