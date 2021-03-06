import { combineReducers } from 'redux';
import cityReducer from './cityReducer';
import itineraryReducer from './itineraryReducer';
import authReducer from './authReducer';
import likesReducer from './likesReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
	cities: cityReducer,
	itinerary: itineraryReducer,
	auth: authReducer,
	likes: likesReducer,
	comments: commentsReducer
});

