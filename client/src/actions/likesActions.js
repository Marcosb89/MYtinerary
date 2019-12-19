export const getLikes = data => {
    return ({
      type: 'GET_LIKES',
      payload: data
    })
  }