import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getComments } from '../actions/commentsActions';

class SingleComment extends React.Component {
  constructor (props){
    super(props);
    this.state = {
      comment: this.props.commentData,
      edit: false,
      editCommentText: this.props.commentData.text,
      value: this.props.value
    };
    this.deleteComment = this.deleteComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.submitEdit = this.submitEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.value !== this.props.value) {
      this.setState({value: this.props.value});
    }
  }

  commentary(){    
    let user = this.state.comment.user;
    let text = this.state.comment.text;
    let userId = this.state.comment.userId;
        
    return(
      <div className='singleCommentBox'>
        {this.state.edit === false ?
          [(this.props.auth.user.id === userId ?
            <div style={{backgroundColor: '#ddd'}}>
              <img id='commentIcon' src={require('../assets/images/delete.png')} alt='delete' onClick={this.deleteComment}/>
              <img id='commentIcon' src={require('../assets/images/edit.png')} alt='edit' onClick={this.editComment}/>
              <h6>{user}</h6>
              <p>{text}</p>  
            </div>
          : 
            <div style={{backgroundColor: '#ddd'}}>
              <h6>{user}</h6>
              <p>{text}</p>
            </div>
          )]
        :
          <div style={{backgroundColor: '#ddd'}}>
            <img id='commentIcon' src={require('../assets/images/delete.png')} alt='closeEdit' onClick={this.closeEdit}/>
            <img id='commentIcon' src={require('../assets/images/submitEdit.png')} alt='submitEdit' onClick={this.submitEdit}/>
            <h6>{user}</h6>
            <textarea className='editTextArea' value={this.state.editCommentText} onChange={(e) => this.updateCommentText(e.target.value)}/>
          </div>
        }
      </div>
    )
  }

  async deleteComment(){
    let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
    let userId = this.state.comment.userId;
    let commentUser = this.state.comment.user;
    let commentText = this.state.comment.text;    
    await axios.put(`http://localhost:5000/users/comments/delete/${userId}/${itId}`,{commentUser, commentText}) 
    await this.props.getComments(itId)   
    this.props.modifyParentState();
  }

  editComment(){
    this.setState({edit: true})  
  }

  updateCommentText = (text) => {
    this.setState({editCommentText: text})
	}

  // async submitEdit(){
  //   let itId = this.props.itinerary.itinerary[this.props.activityIndex]._id;
  //   let userId = this.state.comment.userId;
  //   let commentUser = this.state.comment.user;
  //   let commentText = this.state.comment.text;
  //   let newCommentText = this.state.editCommentText;
  //   await axios.put(`http://localhost:5000/users/comments/edit/${userId}/${itId}`,{commentUser, commentText, newCommentText})
  //   await this.props.getComments(itId)
  //   this.setState({edit: false})
  //   this.props.modifyParentState();
  // }
  async submitEdit(){
        let comment={
          itId : this.props.itinerary.itinerary[this.props.activityIndex]._id,
          userId : this.state.comment.userId,
          commentUser : this.state.comment.user,
          commentText : this.state.comment.text,
          newCommentText : this.state.editCommentText    
    }
    this.props.editComment(comment)
    this.setState({edit: false})
  }


  closeEdit(){
    this.setState({edit: false})
    this.setState({editCommentText: this.props.commentData.text})
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
    getComments: data => {
      return dispatch(getComments(data))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleComment);