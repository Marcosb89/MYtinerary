import React from 'react';
import Toolbar from './Toolbar';
import { Link } from 'react-router-dom';



class LogIn extends React.Component {

   onLogIn = () => {
		window.location.href = 'http://localhost:5000/auth/google'		
   }

	render(){
		return(
		<div className='mainAccount'>
				<Toolbar />
        <form className='accountForm' method='POST' action="/login">
					<h1>Login</h1>
					<div className='accountFormField'>
						<label htmlFor='email'>Email</label>
						<input type="text" name='email' required/>
					</div>
					<div className='accountFormField'>
						<label htmlFor='password'>Password</label>
						<input type="password" name='password' id='password' required/>
					</div>
					<div className='accountFormField'>
						<button	type='submit' id='submit'>Login</button>
					</div>
				</form>
				<br/>
				<Link style={{fontSize:'4vw',}} to='/'>Forgot your username or password?</Link>
				<p>Social media login</p>
				<button onClick={this.onLogIn}>Google</button>
			</div>
		)
	}
}

export default LogIn;