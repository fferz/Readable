import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {  } from '../actions' 

const CommentForm = (props) => (
    <div className="comment-form">
        <form id="new-comment-formid" onSubmit={props.handleSave} >
            <div>
                <label htmlFor="comment">Comment: </label>
                <div>
                    <Field
                        name="comment"
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

export default connect()(reduxForm({
    form: 'formId-commentForm',
    fields: ['comment', 'author'],
    
})(CommentForm));
