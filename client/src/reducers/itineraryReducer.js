import { isTemplateElement } from "@babel/types"

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
    case 'SET_ITINERARY_LIKES':      
      return state.itinerary.map(item  => {
        if(item._id === action.payload.id){
          console.log(item);
          return{
            ...item,
            rating: action.payload.itiLikes
          }
        }else{console.log('error reducer');
        }
        return item;
      })

      
    default:
			return state;
	}
}

export default itineraryReducer;

//var itiPayload = {rating: itiLikes, id: itiId}; 
