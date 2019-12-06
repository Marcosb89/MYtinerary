import React from 'react';
import { connect } from 'react-redux';
import { googleSign } from '../actions/authActions';

class Login extends React.Component {

  componentDidMount() {
    const { token } = this.props.match.params;
    this.props.googleSign(token);
    this.props.history.push("/")

  }
  render() {
    return (
      <div>
        <p>Redirecting...</p>
      </div>
    )
  }
}


// const mapStateToProps = state => ({
//   auth: state.auth,
// })

export default connect(null, { googleSign })(Login)