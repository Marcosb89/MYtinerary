import { createStore, compose, applyMiddleware } from 'redux';
import combineReducers from './reducers/rootReducer';
import thunk from 'redux-thunk';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combineReducers, composeEnhancer(applyMiddleware(thunk)))

export default store;