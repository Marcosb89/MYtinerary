import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getLikes } from '../actions/likesActions';
import { getItineraryData } from '../actions/itineraryActions';
import { setUserLikes } from '../actions/authActions';



class LikeBtn extends React.Component {
  constructor(){
    super();
    this.state = {
      isLiked: false,
    }
  }  

  //getDerivedStateFromProps(props){   
  componentWillReceiveProps() {
    /*if(!props.likes.liked){
      this.props.getLikes(props.auth.user.id)
    }*/
    if(this.props.auth.user.likes.indexOf(this.props.activityId) !== -1) {
      this.setState({isLiked: true})
    } else {
      this.setState({isLiked: false})
    }
  }

  componentDidMount(){      
    //this.props.getLikes(this.props.auth.user.id);
    if(this.props.auth.user.likes){
      if(this.props.auth.user.likes.indexOf(this.props.activityId) !== -1) {
        this.setState({isLiked: true})
      } else {
        this.setState({isLiked: false})
      }
    }else{
      console.log('The user has no likes');  
      this.setState({isLiked: false})
    }      
  }

  async handleClick(){
    var itId = this.props.activityId;
    var userId = this.props.auth.user.id;
    await axios.put(`http://localhost:5000/users/likes/postlike/${userId}/${itId}`)
    .then((res) => {
      console.log(res.data)
      this.props.itinerary.itinerary[this.props.index].rating = res.data.rating;
      this.props.setUserLikes(res.data.likes)
      this.setState({ isLiked: !this.state.isLiked })
      console.log(this.props)
      //deshabilitar boton 
    })
    

    //Para que hace esto? ====> this.props.getItineraryData(this.props.cityId);


    // .then(res => {
    //   console.log(res.data)
    // })
    // .then(data => {

    // })
    // .catch(e => {
    //   console.log(e/*.response.data*/)
    // })

  }

  render(){
    return(
      <button id='btnLike' onClick={this.handleClick.bind(this)}>
         {(this.state.isLiked === false) ? 
         <img id='like' src={require('../assets/images/heart.png')} alt='like'/> : 
         <img id='like' src={require('../assets/images/heartFull.png')} alt='like'/>}  
         {/* <p>Likes: {this.props.itinerary.itinerary[this.props.index].rating}</p> */}   
      </button>
    )
  }
}

const mapStateToProps = state => ({
  likes: state.likes,
  itinerary: state.itinerary,
  auth: state.auth
})

export default connect(mapStateToProps, {getLikes, getItineraryData, setUserLikes})(LikeBtn);
