import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class SingleComment extends React.Component {
  constructor (props){
    super(props);
    this.state = {

    };
    this.deleteComment = this.deleteComment.bind(this);
    this.editComment = this.editComment.bind(this);
  }

  commentary(){    
    let commentData = this.props.commentData;
    let user = commentData.user;
    let text = commentData.text;
    let userId = commentData.userId;
        
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
    console.log('Delete');
    let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
    let userId = this.props.auth.user.id;
    let commentUser = this.props.auth.user.email;
    let commentText = this.props.itinerary.itinerary[this.props.activityIndex].comments[this.props.commentIndex].text;
    console.log(commentText);
    
    axios.put(`http://localhost:5000/users/comments/delete/${userId}/${itId}`,{commentUser, commentText})
  }

  editComment(){
    console.log('Edit');
    let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
    let userId = this.props.auth.user.id;
    let commentUser = this.props.auth.user.email;
    let commentText = this.props.itinerary.itinerary[this.props.activityIndex].comments[this.props.commentIndex].text;
    axios.put(`http://localhost:5000/users/comments/edit/${userId}/${itId}`,{commentUser, commentText})
  }

  render(){
    console.log(this.props);
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

export default connect(mapStateToProps, null )(SingleComment);