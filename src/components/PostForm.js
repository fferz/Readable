import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

class PostForm extends React.Component {

    handleInitialize(){
        if (this.props.postData){
            const initData = {
                title: this.props.postData.title,
                author: this.props.postData.author,
                category: this.props.postData.category,
                body: this.props.postData.body,
                commentCount: this.props.postData.commentCount,
                deleted: false,
                id: this.props.postData.id,
                voteScore: this.props.postData.voteScore,
            }
            console.log('initData loaded in PostForm', initData)
            this.props.initialize(initData)
        }
    }

    componentDidMount(){
        this.handleInitialize();
    }

    render(){
        const { handleSubmit } = this.props
        console.log('postData en PostForm', this.props)
    return (
        <div className="new-post-content">
            <form id="new-post-formId" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title" className="label-form">Title</label>
                    <div>
                        <Field 
                            name="title"
                            component="input"
                            type="text"
                            placeholder="title"
                        >
                        </Field>
                    </div>
                </div>
                    
                <div>
                    <label htmlFor="author">Author</label>
                    <div>
                        <Field
                            name="author"
                            component="input"
                            type="text"
                            placeholder="author"
                        >
                        </Field>
                    </div>
                </div>
                
                <div>
                    <label htmlFor="category">Category</label>
                    <div>
                        <Field name="category" component="select">
                            <option />
                            {this.props.categoryReducer.categories.map((cat)=>
                                <option value={cat.name} key={cat.name}>{cat.name}</option>)}
                        </Field>
                    </div>
                </div>
                         
                <div>
                    <label htmlFor="body">Text</label>
                    <div>
                        <Field
                            name="body"
                            component="textarea"
                            type="text"
                            placeholder=""
                        >
                        </Field>
                    </div>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

        </div>

    )
  }}

function mapStateToProps (state){

    return state
}

function mapDispatchToProps(dispatch){
    return {
    }
}

PostForm = connect(
    mapStateToProps,
    mapDispatchToProps,
)(PostForm)

PostForm = reduxForm({
    form: 'formId-postForm',
    fields: ['title', 'author', 'category', 'body', 'commentedCount', 'deleted', 'id', 'voteScore'],
})(PostForm)

export default PostForm


