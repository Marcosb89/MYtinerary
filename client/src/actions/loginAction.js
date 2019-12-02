export const getToken = data => {
	return ({
		type: 'GET_TOKEN',
	  payload: data
	})
}