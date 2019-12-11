import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import MYtinerary from './components/MYtinerary';
import Cities from './components/Cities';
import Itinerary from './components/Itinerary';
import CreateAccount from './components/CreateAccount';
import Login from './components/LogIn';
import GoogleSign from './components/GoogleSign';
import PageError from './components/PageError';
import * as serviceWorker from './serviceWorker';
import "./style/style.css";
import {store, persistor} from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

const routing = (
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<Router>
				<Switch>
					<Route exact path='/' component={App} />
					<Route exact path='/mytinerary' component={MYtinerary} /> 
					<Route exact path='/cities' component={Cities} />
					<Route exact path='/cities/:city_id' component={Itinerary} />
					<Route exact path='/createAccount' component={CreateAccount} /> 
					<Route exact path='/login' component={Login} />
					<Route exact path='/logout' component={Login} />
					<Route exact path='/googleSign/:token' component={GoogleSign} />
					<Route component={PageError} />
				</Switch>
			</Router>
		</PersistGate>
	</Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();