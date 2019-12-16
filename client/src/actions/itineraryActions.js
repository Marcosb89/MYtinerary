//---Environment data---
/*require('dotenv').config();
const host = process.env.HOST;
const port = process.env.PORT;*/

export const getItineraryData = (city_id) =>  (dispatch) => {	
	fetch('http://localhost:5000/cities/' + city_id)
	.then(response=> response.json())
	.then(data => {
		dispatch({
			type: 'GET_ITINERARY_DATA',
		  payload: data
		})
	})	
}

export const setItineraryLikes = data => {
  return ({
    type: 'SET_ITINERARY_LIKES',
    payload: data
  })
}