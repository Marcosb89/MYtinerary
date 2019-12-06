import React from 'react';
import Toolbar from './Toolbar';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';


require('dotenv').config();



class Login extends React.Component {
	state = {
		email:'',
		password: ''
	}

	sendFormIn = async (e) => {
		e.preventDefault()
	 const userData = { 
		 email: this.state.email, 
		 password: this.state.password
		}
		this.props.loginUser(userData)
		this.props.history.push('/');
	 /*let response = await axios.post('http://localhost:5000/users/login', {email, password})	 
	 this.props.setUserData(response);
	 localStorage.setItem('token', this.props.token);
	 this.props.history.push('/');*/
	}

  onLogIn = () => {
		//const url = process.env.HOST + process.env.PORT;
		window.location.href =  'http://localhost:5000/auth/google'
		//http://localhost:5000/auth/google
   }

	onLogOut = () => {
		window.location.href = "https://mail.google.com/mail/u/0/?logout&hl=en";
	}
	
	updateEmail = (email) => {
    this.setState({email})
	}
	
	updatePassword = (password) => {
    this.setState({password})
	}
	
	render(){
		return(
			<div className='mainAccount'>
				<Toolbar />
				<form className='accountForm'>
					<h1>Login</h1>
					<div className='accountFormField'>
						<label htmlFor='email'>Email</label>
						<input type="text" name='email' value={this.state.email} 
						onChange={(e) => this.updateEmail(e.target.value)} required/>
					</div>
					<div className='accountFormField'>
						<label htmlFor='password'>Password</label>
						<input type="password" name='password' id='password' value={this.state.password} 
						onChange={(e) => this.updatePassword(e.target.value)} required/>
					</div>
					<div className='accountFormField'>
						<button	type='submit' id='submit' onClick={this.sendFormIn}>Login</button>
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

//-----
//REDUX
//-----

/*const mapStateToProps = state => {
  return {
	 token: state.token
  };
};*/

export default connect(null, {loginUser})(Login);