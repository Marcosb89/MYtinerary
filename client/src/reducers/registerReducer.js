const initialState = {
  cities: []
}

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_CITIES':
      return {
        ...state,
        cities: [...action.payload]
      }
    default:
      return state;
  }
}

export default registerReducer