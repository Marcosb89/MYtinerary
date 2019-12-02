import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import itineraryReducer from './itineraryReducer';
import registerReducer from './registerReducer';
import registerReducer from './registerReducer';
import loginReducer from './loginReducer';


export default combineReducers({
	cities: cityReducer,
	itinerary: itineraryReducer,
	register: registerReducer,
	login: loginReducer
});

//localStorage.setItem('token', token)