/**
 * Created by Brandon Garling on 11/9/2016.
 */
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import iBuyApp from './Reducers'

export default Store = createStore(iBuyApp, applyMiddleware(thunkMiddleware));