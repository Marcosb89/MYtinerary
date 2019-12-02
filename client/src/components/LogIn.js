import React from 'react';
import Toolbar from './Toolbar';
import { Link } from 'react-router-dom';
require('dotenv').config();



class LogIn extends React.Component {

   onLogIn = () => {
		 //const url = process.env.HOST + process.env.PORT;
		 window.location.href =  'http://localhost:5000/auth/google'
		//http://localhost:5000/auth/google
   }

	 onLogOut = () => {
		window.location.href = "https://mail.google.com/mail/u/0/?logout&hl=en";
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
				<button onClick={this.onLogIn}>Google In</button>
				<button onClick={this.onLogOut}>Google Out</button>
			</div>
		)
	}
}

export default LogIn;