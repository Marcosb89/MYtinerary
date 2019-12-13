import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getLikes } from '../actions/likesActions';
import { getItineraryData } from '../actions/itineraryActions';


class LikeBtn extends React.Component {
  constructor(){
    super();
    this.state = {
      isLiked: false
    }
  }  

  //getDerivedStateFromProps(props){   
  componentWillReceiveProps(props) {
    if(!props.likes.liked){
      this.props.getLikes(props.auth.user.id)
    }
    if(props.likes.liked.data.indexOf(props.activityId) !== -1) {
      this.setState({isLiked: true})
    } else {
      this.setState({isLiked: false})
    }
  }

  componentDidMount(){  
    this.props.getLikes(this.props.auth.user.id);
    if(this.props.likes.liked.data){
      if(this.props.likes.liked.data.indexOf(this.props.activityId) !== -1) {
        this.setState({isLiked: true})
      } else {
        this.setState({isLiked: false})
      }
    }        
  }

  async handleClick(){    
    var itId = this.props.activityId;
    var userId = this.props.auth.user.id;
    await axios.put(`http://localhost:5000/users/likes/postlike/${userId}/${itId}`)
    .then(res => {
      console.log(res.data)
      this.props.getLikes(userId);
      this.setState({isLiked: !this.state.isLiked})
      //Para que hace esto? ====> this.props.getItineraryData(this.props.cityId);
    })
    .catch(e => {
      console.log(e.response.data)
    })
  }

  render(){ 
    return(
      <button id='btnLike' onClick={this.handleClick.bind(this)}>
         {(this.state.isLiked === false) ? 
         <img id='like' src={require('../assets/images/heart.png')} alt='like'/> : 
         <img id='like' src={require('../assets/images/heartFull.png')} alt='like'/>}      
      </button>
    )
  }
}

const mapStateToProps = state => ({
  likes: state.likes,
  itinerary: state.itinerary,
  auth: state.auth
})

export default connect(mapStateToProps, {getLikes, getItineraryData})(LikeBtn);

  //--------LO DEL PI-------
  //var itId = this.props.id;
  /*var itId = this.props.activityId;
  var userId = this.props.auth.user._id;
  await axios.put(`http://localhost:5000/users/likes/postlike/${userId}/${itId}`)
    .then(res => {
      console.log(res.data)
      this.props.getLikes(userId);
      this.setState({isLiked: !this.state.isLiked})
      this.props.getItineraryData(this.props.cityId);
    })
    .catch(e => {
      console.log(e.response.data)
    })*/


  //-------RESACA DE LO MIO---------
  /*render(){

    onLike = async (e) => {
      e.preventDefault()
     const userData = { 
       email: this.props.auth.user.email,
       likes: this.props.auth.user.likes 
      }
      this.props.mongoLike(userData)
    }

    let activityId = this.props.activityId
    
      let userDecoded = jwt_decode(this.props.auth.user);
      const likes = userDecoded.likes;
      console.log(likes);
      
      if(likes.indexOf(activityId) !== -1){
        return(
          <button id='btnLike' onClick={onLike}>
            <img id='like' src={require('../assets/images/heartFull.png')} alt='like'/>
          </button>
          <i
          onClick={this.handleClick} 
          className={this.state.isLiked ? "icon-heart liked" : "icon-heart"}>
        </i>
      )
      }else{
        return(
          <button id='btnLike' onClick={onLike}>
            <img id='like' src={require('../assets/images/heart.png')} alt='like'/>
          </button>
        )
      }  
    }
  }

//-----
//REDUX
//-----
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, {mongoLike})(Like);*/