import { combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
//This line formReducer is refering to the reducer that is given to us
//from the redux-form library once we isntall it
import { reducer as formReducer } from 'redux-form';
import profileReducer from './profile.js';

const rootReducer = combineReducers({
  profileData: profileReducer,
  form: formReducer //Is something that we need for our redux-form to work
});

export default rootReducer;
