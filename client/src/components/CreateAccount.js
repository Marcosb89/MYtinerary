import React from 'react';
import Toolbar from './Toolbar';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { setUserData } from '../actions/authActions';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authActions';



function ValidationMessage(props) {
  if (!props.valid) {
    return <div className='error-msg'>{props.message}</div>
  }
  return null;
}

class CreateAccount extends React.Component {
	state = {
		email:'', emailValid: false,
		emailConf:'', emailConfValid: false,
		password: '', passwordValid: false,
		passwordConf: '', passwordConfValid: false,
		urlPic: '',
		formValid: false,
		errorMsg: {}
	}

	
	//-------------
	//----EMAIL----
	//-------------
	updateEmail = (email) => {
    this.setState({email}, this.validateEmail)
  }

  validateEmail = () => {
    const {email} = this.state;
    let emailValid = true;
    let errorMsg = {...this.state.errorMsg}

    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      emailValid = false;
      errorMsg.email = 'Invalid email format'
    }
    this.setState({emailValid, errorMsg}, this.validateForm)
  }

	updateEmailConf = (emailConf) => {
    this.setState({emailConf}, this.validateEmailConf)
	}
	
	validateEmailConf = () => {
    const {emailConf, email} = this.state;
    let emailConfValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (email !== emailConf) {
      emailConfValid = false;
      errorMsg.emailConf = 'Emails do not match'
    }
    this.setState({emailConfValid, errorMsg}, this.validateForm);
  }

	//------------
	//--PASSWORD--
	//------------
  updatePassword = (password) => {
    this.setState({password}, this.validatePassword);
  }

  validatePassword = () => {
    const {password} = this.state;
    let passwordValid = true;
    let errorMsg = {...this.state.errorMsg}

    // must be 6 chars, must contain a number and must contain a special character

    if (password.length < 6) {
      passwordValid = false;
      errorMsg.password = 'Password must be at least 6 characters long';
    } else if (!/\d/.test(password)){
      passwordValid = false;
      errorMsg.password = 'Password must contain a digit';
    } else if (!/[!@#$%^&*]/.test(password)){
      passwordValid = false;
      errorMsg.password = 'Password must contain a special character';
    }
    this.setState({passwordValid, errorMsg}, this.validateForm);
  }

  updatePasswordConf = (passwordConf) => {
    this.setState({passwordConf}, this.validatePasswordConf)
  }

  validatePasswordConf = () => {
    const {passwordConf, password} = this.state;
    let passwordConfValid = true;
    let errorMsg = {...this.state.errorMsg}

    if (password !== passwordConf) {
      passwordConfValid = false;
      errorMsg.passwordConf = 'Passwords do not match'
    }
    this.setState({passwordConfValid, errorMsg}, this.validateForm);
	}

	updateUrlPic = (urlPic) => {
		this.setState({urlPic})
	}

	//-------------
	//VALIDATE FORM
	//-------------
	validateForm = () => {
		const {emailValid, emailConfValid, passwordValid, passwordConfValid} = this.state;
		this.setState({
			formValid: emailValid && emailConfValid && passwordValid && passwordConfValid
		})
	}

	sendForm = async (e) => {
		e.preventDefault()
	 const { email, password, urlPic } = this.state
	 let response = await axios.post('http://localhost:5000/users/register', {email, password, urlPic})
	 let userData = jwt_decode(response.data.token);
	 this.props.setUserData(userData);
	 this.props.history.push('/');
	}

	/*sendForm = async (e) => {
		e.preventDefault()
		const userData = {
			email: this.state.email,
			password: this.state.password,
			urlPic: this.state.urlPic,
			google: false
		}
		this.props.loginUser(userData)
		this.props.history.push('/');
	}*/

	render(){
		return (
			<div className='mainAccount'>
				<Toolbar />
        <form className='accountForm'>
					<h1>CreateAccount</h1>
					<div className='accountFormField'>
						<label htmlFor='email'>Email</label>
						<input type="email" name='email' id='email' value={this.state.email} 
						onChange={(e) => this.updateEmail(e.target.value)}/>
						< ValidationMessage valid={this.state.emailValid} message={this.state.errorMsg.email} />
					</div>
					<div className='accountFormField'>
						<label htmlFor='emailConf'>Confirm email</label>
						<input type="email" name='emailConf' id='emailConf' value={this.state.emailConf} 
						onChange={(e) => this.updateEmailConf(e.target.value)}/>
						< ValidationMessage valid={this.state.emailConfValid} message={this.state.errorMsg.emailConf} />
					</div>
					<div className='accountFormField'>
						<label htmlFor='password'>Password</label>
						<input type="password" name='password' id='password' value={this.state.password} 
						onChange={(e) => this.updatePassword(e.target.value)}/>
						< ValidationMessage valid={this.state.passwordValid} message={this.state.errorMsg.password} />
					</div>
					<div className='accountFormField'>
						<label htmlFor='passwordConf'>Confirm password</label>
						<input type="password" name='passwordConf' id='passwordConf' value={this.state.passwordConf} 
						onChange={(e) => this.updatePasswordConf(e.target.value)}/>
						< ValidationMessage valid={this.state.passwordConfValid} message={this.state.errorMsg.passwordConf} />
					</div>
					<div className='accountFormField'>
						<label htmlFor='urlPic'>Profile picture url</label>
						<input type="text" name='urlPic' id='urlPic' value={this.state.urlPic} 
						onChange={(e) => this.updateUrlPic(e.target.value)} required/>
					</div>
					<div className='accountFormField'>
						<button type='submit' onClick={this.sendForm} id='submit' disabled={!this.state.formValid}>Submit</button>
					</div>
				</form>
			</div>
		)
	}
}

//-----
//REDUX
//-----

/*const mapStateToProps = state => {
  return {
		// stateForComponent: state.StateFromStore
  };
};*/

const mapDispatchToProps = dispatch => {
  return {
    setUserData: data => {
			return dispatch(setUserData(data))
		},
		loginUser: data => {
			return dispatch(loginUser(data));			
    }
  };
};

export default connect(null, mapDispatchToProps)(CreateAccount);