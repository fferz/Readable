import React from 'react';
import { connect } from 'react-redux';
import { initialize, reset } from 'redux-form';
import { newPostToStore, changePost, fetchAPost } from '../actions/PostsAction'
import PostForm from './PostForm';

class PostFormContainer extends React.Component {

    handleSubmit = values => {
        if (values.id !== undefined) {
            let editValues = {}
            editValues.id = values.id
            editValues.title = values.title
            editValues.body = values.body
            this.props.editPost(editValues)

        } else {
            values.id = this.newId().toString()
            values.timestamp = Date.now()
            this.props.addPostToStore(values)
            this.props.clearForm()
        }

    }

    newId = () => {
        return Math.trunc(Math.random()*10000)
    }

    render() {

        return (
            <div id="app">
                <PostForm
                    onSubmit={this.handleSubmit.bind(this)}
                    postData={this.props.postData}/>
            </div>
        );
    }

}

function mapStateToProps (state){

    return state

}

function mapDispatchToProps(dispatch){
    return {
        addPostToStore: (newPost) => dispatch(newPostToStore(newPost)),
        editPost: (post) => dispatch(changePost(post)),
        clearForm: () => dispatch(reset('formId-postForm')),
        getThisPost: (postId) => dispatch(fetchAPost(postId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostFormContainer)



