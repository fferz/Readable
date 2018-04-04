import React from 'react';
import { connect } from 'react-redux';
import { initialize, reset } from 'redux-form';
import { newComment, changeComment } from '../actions/CommentsAction'
import { upCommentCount } from "../actions/PostsAction";
import CommentForm from './CommentForm';

class CommentFormContainer extends React.Component {
   
   handleSubmit = values => {
       let comment = {}
       comment.body = values.body


        if (values.id !== undefined){
            //edit comment
            comment.id = values.id
            comment.timestamp = Date.now()
            this.props.editComment(comment)

        } else { 
            //new comment
            comment.id = this.newId().toString()
            comment.author = values.author
            comment.timestamp = Date.now()
            comment.parentId = this.props.postReducer.post.id
            this.props.addComment(comment)
            this.props.clearForm()
        }
    }

    newId = () => {
    return Math.trunc(Math.random()*10000)
    }

  render() {
    return (
        <div id="comment-form-container">
        <CommentForm
            onSubmit={this.handleSubmit.bind(this)}
            commentData={this.props.commentData} />
        </div>
    );
  } 
}

function mapStateToProps (state){
  
    return state

}

function mapDispatchToProps(dispatch){
  return {
    clearForm: () => dispatch(reset('formId-commentForm')),
    addComment: (comment) => dispatch(newComment(comment)),
    editComment: (comment) => dispatch(changeComment(comment)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormContainer)

