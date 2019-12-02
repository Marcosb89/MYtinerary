import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import itineraryReducer from './itineraryReducer';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';

export default combineReducers({
	cities: cityReducer,
	itinerary: itineraryReducer,
	login: loginReducer,
	logout: logoutReducer
});

//localStorage.setItem('token', token)