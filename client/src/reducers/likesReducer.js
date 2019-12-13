const initialState = {
    liked: []
}

const likesReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GET_LIKES': 
            return {
                ...state,
                liked: action.payload
            }
        default:
            return state
    }
}

export default likesReducer;