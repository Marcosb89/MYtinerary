import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['cities', 'itinerary']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  composeEnhancer(applyMiddleware(thunk)))

const persistor = persistStore(store);

export { store, persistor };
