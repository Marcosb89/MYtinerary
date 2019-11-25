const initialState = {
  itinerary: []
}

const itineraryReducer = (state = initialState, action) => {
	switch(action.type){
    case 'GET_ITINERARY_DATA':
			return{
					...state,
          itinerary: action.payload

      }
    default:
			return state;
	}
}

export default itineraryReducer;