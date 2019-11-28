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