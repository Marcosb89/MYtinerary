import axios from 'axios';

export const getLikes = (id) => dispatch => {
    axios.get(`http://localhost:5000/users/likes/${id}`)
        .then(res => {
           dispatch({
               type: 'GET_LIKES',
               payload: res
           })
        })
        .catch(err => {
            console.log(err)
        })
}