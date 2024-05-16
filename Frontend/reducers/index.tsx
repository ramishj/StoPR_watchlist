// reducers/index.js
import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  user: userReducer, // userReducer handles state related to user authentication
  // other reducers can be added here
});

export default rootReducer;