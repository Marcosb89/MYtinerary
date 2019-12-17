import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const loginUser = userData => dispatch => {
  axios.post('http://localhost:5000/users/login', userData)
  .then(res => {
      const {token} = res.data;
      const decoded = jwt_decode(token);
      dispatch(setUserData(decoded));
  })/*.catch(err => {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })*/
}

export const setUserData = token => {
  return ({
    type: 'SET_USER_DATA',
    payload: token
  })
}

export const setUserLikes = data => {
  return ({
    type: 'SET_USER_LIKES',
    payload: data
  })
}

export const googleSign = (token) => dispatch => {
  const decoded = jwt_decode(token);
  dispatch(setUserData(decoded));
}