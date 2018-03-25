import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

class CommentForm extends React.Component {

    handleInitialize(){
        if (this.props.commentData){
            const initData = {
                body: this.props.commentData.body,
                author: this.props.commentData.author,
                deleted: this.props.commentData.deleted,
                id: this.props.commentData.id,
                parentDeleted: this.props.commentData.parentDeleted,
                parentId: this.props.commentData.parentId,
                timestamp: this.props.commentData.timestamp,
                voteScore: this.props.commentData.voteScore,
            }
            console.log('initData loaded in CommentForm', initData)
            this.props.initialize(initData)
        }
    }

    componentDidMount(){
        this.handleInitialize();
    }

    render(){
        const { handleSubmit } = this.props
        console.log('postData en CommentForm', this.props)
        return(
            <div className="comment-form">
                <form id="new-comment-formid" onSubmit={handleSubmit} >
                    <div>
                        <label htmlFor="body">Comment: </label>
                        <div>
                            <Field
                                name="body"
                                component="input"
                                type="text"
                                placeholder="a comment"
                            >
                            </Field>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="author">Author: </label>
                        <div>
                            <Field
                                name="author"
                                component="input"
                                type="text"
                                placeholder="my name"
                            >
                            </Field>
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="comment-button">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        )
    }
    

}

export default connect()(reduxForm({
    form: 'formId-commentForm',
    fields: ['body', 'author', 'deleted', 'id', 'parentDeleted', 'parentId', 'timestamp', 'voteScore'],
    
})(CommentForm));


