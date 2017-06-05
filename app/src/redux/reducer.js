import { combineReducers } from 'redux';
import items from './Test';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  items,
  routing: routerReducer
});

export default rootReducer;
