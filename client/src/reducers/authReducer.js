const initialState = {
    user: {}
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return{
        ...state,
        user: action.payload
      }
    case 'SET_USER_LIKES':
      return{
        ...state,
        user: {
          ...state.user, 
          likes: [...action.payload]
      }
    }
    default:
      return state;
  }
}

export default authReducer