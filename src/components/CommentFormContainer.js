import React from 'react';
import { connect } from 'react-redux';
import { initialize, reset } from 'redux-form';
import { newComment, changeComment } from '../actions/CommentsAction' 
import CommentForm from './CommentForm';

class CommentFormContainer extends React.Component {
   
   handleSubmit = values => {
        if (values.id !== undefined){
            values.timestamp = Date.now()
            this.props.editComment(values)
        } else { 
            console.log('creo nuevo commentario', values)
            values.deleted = false
            values.id = this.newId().toString()
            values.parentDeleted = false
            values.parendId = this.props.commentDataView.parendId
            values.timestamp = Date.now()
            values.voteScore = 0
            this.props.addComment(values)
        }
        
    }

    newId = () => {
    return Math.trunc(Math.random()*10000)
    }



  render() {
      console.log('entra al commentForm Container - props', this.props)
    return (
      <div id="comment-form-container">
        <CommentForm 
            onSubmit={this.handleSubmit.bind(this)}
            commentData={this.props.commentDataView}
            />
      </div>
    );
  } 
}

function mapStateToProps (state){
  
  console.log('state - commentFormContainer', state)
  return state

}

function mapDispatchToProps(dispatch){
  return {
    clearForm: () => dispatch(reset('formId-postForm')),
    addComment: (comment) => dispatch(newComment(comment)),
    editComment: (comment) => dispatch(changeComment(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentFormContainer)

