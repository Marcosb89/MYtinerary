import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import SingleComment from './SingleComment';

class Comments extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      commentText:'',
      commentIndex: 0
    };
    this.submitComment = this.submitComment.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  updateText = (commentText) => {
    this.setState({commentText})
	}

  submitComment(){
    if(this.props.auth.user.id){      
      let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
      let commentId = this.props.auth.user.id;
      let commentUser = this.props.auth.user.email;
      let commentText = this.state.commentText;
      axios.put(`http://localhost:5000/users/comments/post/${commentId}/${itId}`,{commentUser, commentText})
    }else alert('You must log in')
  }

  render(){
    let activityIndex= this.props.activityIndex;
    return(
      <div>
        <p style={{ textAlign: 'left', fontSize: '3.5vw', marginTop: '2vh' }}>
        Comments</p>
        <input id='itineraryInput' type='text' placeholder='Your comment...'
        value={this.state.commentText} onChange={(e) => this.updateText(e.target.value)}/>
        <input type='image' src={require('../assets/images/arrow2.png')} onClick={this.submitComment}
          alt='Submit comment' style={{float: 'right', marginTop: '-1.25vh', width: '3vw', height: '4vw', backgroundColor: '#eee'}}/>
        {this.props.itinerary.itinerary[this.props.activityIndex].comments.map((comment, index) => 
        <SingleComment commentData={comment} commentIndex={index} activityIndex={activityIndex}/>)}
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

export default connect(mapStateToProps, null)(Comments);