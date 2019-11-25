import React from 'react';
import Toolbar from './Toolbar';

class CreateAccount extends React.Component {
	check = () => {
		var email = document.getElementById('email');
		var confEmail = document.getElementById('confEmail');
		var password = document.getElementById('password');
		var confPassword = document.getElementById('confPassword');
		
		if(email.value !== confEmail.value || password.value !== confPassword.value){
			alert('The fields must match!')
			return false;
		}
	}
	render(){
		return (
			<div className='mainAccount'>
				<Toolbar />
        <form className='accountForm' method='POST' action="/CreateAccount">
					<h1>CreateAccount</h1>
					<input type="text" name='userName' placeholder='Username'required/>
					<input type="email" name='email' id='email' placeholder='Email' required/>
					<input type="email" name='confEmail' id='confEmail' placeholder='Confirm email' required onClick={this.check}/>
					<input type="text" name='password' id='password'placeholder='Password' required/>
					<input type="text" name='confPassword' id='confPassword'placeholder='Confirm password' required onClick={this.check}/>
					<input type="text" name='urlPic' placeholder='Submit profile pic url' required/>
					<input type='submit' id='submit' onClick={this.check} value='Submit'/>
				</form>
			</div>
		)
	}
}

export default CreateAccount;