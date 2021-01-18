import {createStore} from 'redux';
import UserReducer from '../reduer/UserReducer';

let store=createStore(UserReducer);

export default store;