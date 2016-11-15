/**
 * Created by Brandon Garling on 11/14/2016.
 */
import _ from 'lodash';
import { combineReducers } from 'redux';
import ItemReducer from './ItemReducer';
import UserReducer from './UserReducer';
import GroupReducer from './GroupReducer';

const reducers = _.merge(ItemReducer, UserReducer, GroupReducer);

export default Reducers = combineReducers(reducers);