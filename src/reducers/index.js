import { combineReducers } from 'redux';
import PostReducer from './reducer_posts';
import {reducer as formReducer} from 'redux-form'
import HomeFormNavigationReducer from './reducer_homeform';

const rootReducer = combineReducers({
  homeFormNavigation : HomeFormNavigationReducer,
  posts: PostReducer,
  form: formReducer
});

export default rootReducer;
