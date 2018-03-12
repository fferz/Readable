import React from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import { newPostToStore, editPost } from './actions' 
import PostForm from './PostForm.js';

class PostFormContainer extends React.Component {

  handleSubmit = values => {
    if (values.id !== null) {
      values.timeStamp = Date.now()
      console.log('voy a editPost', values)
      this.props.editPost(values)
    } else {
      values.id = this.newId().toString()
      values.timeStamp = Date.now()
      values.commentCount = 0
      values.deleted = false
      values.voteScore = 0
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
            //postData={this.props.location.state.postData ? this.props.location.state.postData : ''}
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
    editPost: (post) => dispatch(editPost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormContainer)



