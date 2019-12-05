//const isEmpty = require('is-empty');

const initialState = {
  user:{
    token: '',
    urlPic: '',
    email: ''
  }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return{
        ...state,
        user: {
          token: action.payload.data.token,
          urlPic: action.payload.data.urlPic,
          email: action.payload.data.email,
         }
      }
    default:
      return state;
  }
}

export default authReducer