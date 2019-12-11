import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const loginUser = userData => dispatch => {
  axios.post('http://localhost:5000/users/login', userData)
  .then(res => {
      const {token} = res.data;
      //localStorage.setItem('token', token)
      //setAuthToken(token);
      const decoded = jwt_decode(token);
      // localStorage.setItem('urlPic', decoded.urlPic)
      // localStorage.setItem('email', decoded.email)
      // localStorage.setItem('google', decoded.google)
      dispatch(setUserData(decoded));
  })/*.catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })*/
}

export const setUserData = decoded => {
  return ({
    type: 'SET_USER_DATA',
    payload: decoded
  })
}

export const googleSign = (token) => dispatch => {
  //setAuthToken(token);
  const decoded = jwt_decode(token);
  // localStorage.setItem('urlPic', decoded.urlPic)
  // localStorage.setItem('email', decoded.email)
  // localStorage.setItem('google', decoded.google)
  dispatch(setUserData(decoded));
}