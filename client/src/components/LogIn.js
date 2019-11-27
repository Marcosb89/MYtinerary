import React from 'react';
import Toolbar from './Toolbar';
import { Link } from 'react-router-dom';



class LogIn extends React.Component {

   onSignIn = () => {
     window.location.href = 'http://localhost:3000/auth/google/callback'
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

	render(){
		return(
		<div className='mainAccount'>
				<Toolbar />
        <form className='accountForm' method='POST' action="/Login">
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
				<div class="g-signin2" data-onsuccess="onSignIn">
					<button /*href='/api/users/google'*/ onClick={this.onSignIn}>Google</button>
				</div>
			</div>
		)
	}
}

export default LogIn;