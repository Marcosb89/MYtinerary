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
      comments: [],
      value: this.props.value
    };
    this.submitComment = this.submitComment.bind(this);
    this.updateText = this.updateText.bind(this);
    this.modifyParentState = this.modifyParentState.bind(this);
    this.resetSubmitValue = this.resetSubmitValue.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.value !== this.props.value) {
      this.setState({value: this.props.value});
    }
  }

  resetSubmitValue(){
    this.setState({commentText: ''})
  }

  async modifyParentState(){
    this.setState({ comments: this.props.comments.comments}, 
      () => console.log(this.state.comments))
    this.props.getItineraryData(this.props.itinerary.itinerary[this.props.activityIndex].id);
    this.resetSubmitValue();
  }

  async componentDidMount() {
    let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
    await this.props.getComments(itId)
    this.setState({ comments: this.props.comments.comments })
    this.resetSubmitValue();
  }

  updateText = (commentText) => {
    this.setState({commentText})
	}

  submitComment = async (e) => {
    e.preventDefault();
    if(this.props.auth.user.id){      
      let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
      let commentId = this.props.auth.user.id;
      let commentUser = this.props.auth.user.email;
      let commentText = this.state.commentText;
      await axios.put(`http://localhost:5000/users/comments/post/${commentId}/${itId}`,{commentUser, commentText})
      .then(res => {
        this.setState({comments: res.data})
      })
      await this.props.getComments(itId)
      this.modifyParentState();
    }else alert('You must log in')
  }

  editComment= async(comment)=>{
      await axios.put(`http://localhost:5000/users/comments/edit/${comment.userId}/${comment.itId}`,{commentUser:comment.commentUser, commentText:comment.commentText, newCommentText:comment.newCommentText})
      .then(res => {
        this.setState({comments: res.data})
      })
      await this.props.getComments(comment.itId)
      this.props.getItineraryData(this.props.itinerary.itinerary[this.props.activityIndex].id);
      this.setState({ comments: this.props.comments.comments })
    
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
        {/* {this.props.itinerary.itinerary[this.props.activityIndex].comments.map((comment, index) =>  */}
        {this.state.comments.map((comment, index) => 
        <SingleComment key={index} /* modifyParentState={this.modifyParentState} */ editComment={this.editComment} 
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