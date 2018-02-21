import React, { Component } from 'react'
import './App.css'

class NewPost extends Component {



  render() {
    return (
        <div className="new-post-content">
            <form id="new-post-formId">
                <div>
                    <label for="postTitle" className="label-form">Title</label>
                    <input type="text" id="postTitle" name="postTitle" className="input-form" />   
                </div>
                    
                <div>
                    <label for="postAuthor">Author</label>
                    <input type="text" id="postAuthor" name="postAuthor" className="input-form"/>
                </div>
                
                <div>
                    <label for="postCategory">Category</label>
                    <select id="postCategory" name="postCategory" >
                        {this.props.categories.map((cat)=>
                            <option value={cat.name}>{cat.name}</option>)}
                    </select> 
                </div>
                         
                <div>
                    <label for="postBody">Text</label>
                    <textarea rows="10" cols="50" name="postBody" id="postBody" type="text" form="new-post-formId" />
                </div>

                <div>
                    <input type="button" value="Save"></input>
                </div>
            </form>

        </div>

    )
  }
}

export default NewPost;