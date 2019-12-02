export const deleteToken = data => {
	return ({
		type: 'DELETE_TOKEN',
	  payload: data
	})
}