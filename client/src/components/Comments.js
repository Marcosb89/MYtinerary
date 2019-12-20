import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import SingleComment from './SingleComment';
import { getComments } from '../actions/commentsActions';
import { getItineraryData } from '../actions/itineraryActions';


class Comments extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      commentText:'',
      commentIndex: 0,
      comments: []
    };
    this.submitComment = this.submitComment.bind(this);
    this.updateText = this.updateText.bind(this);
    this.prepareComments = this.prepareComments.bind(this);
  }

  prepareComments = async() => {
    let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
    await this.props.getComments(itId);
    await this.props.getItineraryData(this.props.itinerary.itinerary[this.props.activityIndex].id);
    await this.setState({comments: this.props.comments.comments});
    console.log(this.state.comments);
    console.log(this.props.itinerary.itinerary[this.props.activityIndex].comments); 
  }

  async componentDidMount() {
    this.props.getItineraryData(this.props.itinerary.itinerary[this.props.activityIndex].id);
    let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
    await this.props.getComments(itId);
    this.setState({ comments: this.props.comments.comments });
  }

  updateText = (commentText) => {
    this.setState({commentText});
	}

  submitComment = async (e) => {
    e.preventDefault();
    if(this.props.auth.user.id){      
      let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
      let commentId = this.props.auth.user.id;
      let commentUser = this.props.auth.user.email;
      let commentText = this.state.commentText;
      await axios.put(`http://localhost:5000/users/comments/post/${commentId}/${itId}`,{commentUser, commentText});
      this.prepareComments();
      this.setState({commentText: ''})
    }else alert('You must log in');
  }

  deleteComment = async(comment) => { 
    await axios.put(`http://localhost:5000/users/comments/delete/${comment.userId}/${comment.itId}`,
    {commentUser:comment.commentUser, commentText:comment.commentText})
    .then(res => {
      this.setState({ comments: [] })
      return res;
    })
    this.prepareComments();
  }

  editComment= async(comment)=>{
    await axios.put(`http://localhost:5000/users/comments/edit/${comment.userId}/${comment.itId}`,
    {commentUser:comment.commentUser, commentText:comment.commentText, newCommentText:comment.newCommentText, commentIndex: comment.commentIndex})
    .then(res =>  {
        this.setState({comments:[]})
        return res;
      })
    await this.prepareComments();
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
        {/* {this.props.itinerary.itinerary[this.props.activityIndex].comments.map((comment, index) => */}
        {this.state.comments.map((comment, index) => 
        <SingleComment key={index} editComment={this.editComment} deleteComment={this.deleteComment} 
        commentData={comment} commentIndex={index} activityIndex={activityIndex}/>)}
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
    auth: state.auth,
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getComments: data => {
      return dispatch(getComments(data))},
    getItineraryData: data => {
      return dispatch(getItineraryData(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);