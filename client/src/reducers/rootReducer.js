import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import itineraryReducer from './itineraryReducer';
import authReducer from './authReducer';

export default combineReducers({
	cities: cityReducer,
	itinerary: itineraryReducer,
	auth: authReducer
});

