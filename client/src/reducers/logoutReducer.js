const initialState = {
  token: ''
}

const logoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
}

export default logoutReducer