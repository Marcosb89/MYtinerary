import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getItineraryData } from '../actions/itineraryActions';


class SingleComment extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      comment: this.props.commentData
    };
    this.deleteComment = this.deleteComment.bind(this);
    this.editComment = this.editComment.bind(this);
  }

  commentary(){    
    console.log(this.state.comment); 
    let user = this.state.comment.user;
    let text = this.state.comment.text;
    let userId = this.state.comment.userId;
        
    return(
      <div className='singleCommentBox'>
        {this.props.auth.user.id === userId ?
          <div>
            <img id='commentIcon' src={require('../assets/images/delete.png')} alt='delete' onClick={this.deleteComment}/>
            <img id='commentIcon' src={require('../assets/images/edit.png')} alt='edit' onClick={this.editComment}/>  
          </div>
          : <div></div>}
        <h6>{user}</h6>
        <p>{text}</p>
      </div>
    )
  }

  deleteComment(){
    let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
    let userId = this.state.comment.userId;
    let commentUser = this.state.comment.user;
    //let commentText = this.props.itinerary.itinerary[this.props.activityIndex].comments[this.props.commentIndex].text;
    let commentText = this.state.comment.text;
    console.log(commentText);
    
    axios.put(`http://localhost:5000/users/comments/delete/${userId}/${itId}`,{commentUser, commentText})    
    //this.props.modifyParentState();
  }

  editComment(){
    let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
    let userId = this.state.comment.userId;
    let commentUser = this.state.comment.user;
    //let commentText = this.props.itinerary.itinerary[this.props.activityIndex].comments[this.props.commentIndex].text;
    let commentText = this.state.comment.text;
    axios.put(`http://localhost:5000/users/comments/edit/${userId}/${itId}`,{commentUser, commentText})
    //this.props.modifyParentState();
  }

  render(){
    return(
      <div className='allCommentsBox'>
        {this.commentary()}
      </div>
    )
  }
}

//-----
//REDUX
//-----
const mapStateToProps = state => {
  return {
    itinerary: state.itinerary,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getItineraryData: data => {
      return dispatch(getItineraryData(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment);