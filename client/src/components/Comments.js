import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getItineraryData } from '../actions/itineraryActions';

class Comments extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      commentText:'',
      commentIndex: 0
    };
    this.submitComment = this.submitComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.updateText = this.updateText.bind(this);

  }

  commentary(){    
    let index = this.props.index;
    let comment = this.props.itinerary.itinerary[index].comments.map((comment, index) => {
      let user = comment.user;
      let text = comment.text;
      let userId = comment.userId;
      this.setState({commentIndex: index});
      console.log(this.state.commentIndex);
      
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
      );
    });
    return <div className='allCommentsBox'>{comment}</div>;
  }

  updateText = (commentText) => {
    this.setState({commentText})
	}

  submitComment(){
    if(this.props.auth.user.id){      
      let itId = this.props.itinerary.itinerary[this.props.index]._id;
      let commentId = this.props.auth.user.id;
      let commentUser = this.props.auth.user.email;
      let commentText = this.state.commentText;
      axios.put(`http://localhost:5000/users/comments/post/${commentId}/${itId}`,{commentUser, commentText})
    }else alert('You must log in')
  }

  deleteComment(){
    console.log('Delete');
    let itId = this.props.itinerary.itinerary[this.props.index]._id;
    let commentId = this.props.auth.user.id;
    let commentUser = this.props.auth.user.email;
    let commentText = this.props.itinerary.itinerary[this.props.index].comments[this.state.commentIndex].text;
    console.log(commentText);
    
    axios.put(`http://localhost:5000/users/comments/delete/${commentId}/${itId}`,{commentUser, commentText})
  }

  editComment(){
    console.log('Edit');
    let itId = this.props.itinerary.itinerary[this.props.index]._id;
    let commentId = this.props.auth.user.id;
    let commentUser = this.props.auth.user.email;
    let commentText = this.props.itinerary.itinerary[this.props.index].comments[this.state.commentIndex].text;
    axios.put(`http://localhost:5000/users/comments/edit/${commentId}/${itId}`,{commentUser, commentText})
  }

  render(){
    return(
      <div>
        <p style={{ textAlign: 'left', fontSize: '3.5vw', marginTop: '2vh' }}>
        Comments</p>
        <input id='itineraryInput' type='text' placeholder='Your comment...'
        value={this.state.commentText} onChange={(e) => this.updateText(e.target.value)}/>
        <input type='image' src={require('../assets/images/arrow2.png')} onClick={this.submitComment}
          alt='Submit comment' style={{float: 'right', marginTop: '-1.25vh', width: '3vw', height: '4vw', backgroundColor: '#eee'}}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Comments);