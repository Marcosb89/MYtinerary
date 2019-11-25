import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import App from './components/App';
import MYtinerary from './components/MYtinerary';
import Cities from './components/Cities';
import Itinerary from './components/Itinerary';
import CreateAccount from './components/CreateAccount';
import Login from './components/LogIn';
import PageError from './components/PageError';
import * as serviceWorker from './serviceWorker';
import "./style/style.css";
import store from './store'
import { Provider } from 'react-redux'

const routing = (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path='/' component={App} />
				<Route path='/MYtinerary' component={MYtinerary} /> 
				<Route exact path='/Cities' component={Cities} />
				<Route path='/Cities/:city_id' component={Itinerary} />
				<Route path='/CreateAccount' component={CreateAccount} /> 
				<Route path='/Login' component={Login} />  
				<Route component={PageError} />
			</Switch>
		</Router>
		</Provider>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
