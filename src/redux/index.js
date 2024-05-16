import { createStore, combineReducers } from 'redux';
import loginReducer from './userReducer';

const rootReducer = combineReducers({
  login: loginReducer,
});

const store = createStore(rootReducer);

export default store;