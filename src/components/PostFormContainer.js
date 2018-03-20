import React from 'react';
import { connect } from 'react-redux';
import { initialize, reset } from 'redux-form';
import { newPostToStore, changePost } from '../actions' 
import PostForm from './PostForm';

class PostFormContainer extends React.Component {

  handleSubmit = values => {
    if (values.id !== undefined) {
      values.timestamp = Date.now()
      console.log('voy a editPost', values)
      this.props.editPost(values)
    } else {
      values.id = this.newId().toString()
      values.timestamp = Date.now()
      values.commentCount = 0
      values.deleted = false
      values.voteScore = 0
      console.log('voy a create new post', values)
      this.props.addPostToStore(values)
    }
    
  }

  newId = () => {
    return Math.trunc(Math.random()*10000)
  }


  render() {
      console.log('entra al postForm COntainer - props', this.props)
    return (
      <div id="app">
        <PostForm 
            onSubmit={this.handleSubmit.bind(this)}
            categories={this.props.categories}
            postData={this.props.postData}
            />
      </div>
    );
  }

}

function mapStateToProps (state){
  
  console.log('state - postFormContainer', state)
  //let array = Object.values(postReducer)
  return state

}

function mapDispatchToProps(dispatch){
  return {
    addPostToStore: (newPost) => dispatch(newPostToStore(newPost)),
    editPost: (post) => dispatch(changePost(post)),
    clearForm: () => dispatch(reset('formId-postForm')),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormContainer)



