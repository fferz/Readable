import React from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';
import PostForm from './PostForm.js';

class PostFormContainer extends React.Component {

  handleSubmit = values => {
    values.id = this.newId().toString()
    values.timeStamp = Date.now()
    values.commentCount = 0
    values.deleted = false
    values.voteScore = 0
    console.log('values', values)
    this.props.addPostToStore(values)
    this.props.dispatch(initialize('post-form-id', {})); // clear form
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

export default connect()(PostFormContainer);
