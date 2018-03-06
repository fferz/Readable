import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { addPostInStore } from './actions' 
import { connect } from 'react-redux'
import './App.css'


const PostForm = props => {
    const { handleSubmit } = props


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
                        />
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
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="category">Category</label>
                    <div>
                        <Field name="category" component="select">
                            <option />
                            {props.categories.map((cat)=>
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
                        />
                    </div>
                </div>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>

        </div>

    )
  }
/*
const onSubmit = (values, dispatch) => {
        
        console.log('dispatch', dispatch)
        values.id = newId().toString()
        values.timeStamp = Date.now()
        console.log('values', values)
        return values;
    }

const newId = () => {
    return Math.trunc(Math.random()*10000)
}


function mapDispatchToProps(dispatch){
  return {
    addNewPost: (newPost) => dispatch(addPostInStore(newPost)),
  }
}

export default connect()(reduxForm({
    form: 'formId-postForm',
    onSubmit,
})(PostForm));
*/

export default reduxForm({
    form: 'post-form-id'
})(PostForm)
