import React from 'react';
import Toolbar from './Toolbar';

class LogIn extends React.Component {
	render(){
		return(
		<div className='mainAccount'>
				<Toolbar />
        <form className='accountForm' method='POST' action="/Login">
					<h1>Login</h1>
					<input type="text" name='userName' placeholder='Username'required/>
					<input type="text" name='password' id='password'placeholder='Password' required/>
					<input type='submit' id='submit' onClick={this.check} value='Login'/>
				</form>
			</div>
		)
	}
}

export default LogIn;