import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route} from 'react-router-dom'
import DownVoteIcon from 'react-icons/lib/fa/hand-o-down'
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up'
import CommentsIcon from 'react-icons/lib/fa/comment-o'
import { deletePostFromStore, likePost, notLikePost } from '../actions'
import { fetchComments, newComment, changeComment, eraseComment, likeComment, notLikeComment } from '../actions/CommentsAction'
import { fetchAPost } from '../actions/index'
import CommentForm from './CommentForm'

class PostView extends Component{

    state = {
        comments : [],
        newCommentFlag : false,
        post: null,
    }

    componentDidMount(){

        console.log('component DID mount')
        this.props.saveAPost(this.props.postDataView.id)
        this.props.saveComments(this.props.postDataView.id)
        
    }

    handleSave = values => {
        if (values.id !== undefined){
            values.timestamp = Date.now()
            this.props.editComment(values)
        } else { 
            this.showNewCommentButton
            console.log('creo nuevo commentario', values)
            values.deleted = false
            values.id = this.newId().toString()
            values.parentDeleted = false
            values.parendId = this.props.postDataView.id
            values.timestamp = Date.now()
            values.voteScore = 0
            this.props.addComment(values)
        }
    }

    newId = () => {
    return Math.trunc(Math.random()*10000)
    }

    showNewCommentForm = () => {
        this.setState({newCommentFlag : true})
    }

    showNewCommentButton = () => {
        this.setState({newCommentFlag : false})
    }


    render(){
        console.log('props (PostView)', this.props.postDataView)
        console.log('state (PostView)', this.props.state)
        console.log('props.state', this.props)
        console.log('EL POST', this.props.postReducer.post)

        const post  = this.props.postDataView ? this.props.postDataView : this.props.postReducer.post

        let showCreateComment = null
        if (this.state.newCommentFlag === false) {
            
            showCreateComment = <Link to={{ pathname: `/post/post-view`, state: {postDataView: post} }}>
                                    <button className="comment-button" onClick={this.showNewCommentForm}>
                                        new comment
                                    </button>           
                                </Link>
            
        } else {
            this.showNewCommentButton
            showCreateComment = <CommentForm 
                                    onSubmit={this.handleSave.bind(this)}/>
        }
        
        return(
            <div className="post-view-content">
                <div className="post-view-title">
                    <h1>{post.title}</h1>
                </div>
                <div className="post-view-author">
                    <span className="author">author: </span>
                    {post.author}
                </div>
                <div className="post-view-category">
                    <span className="category">category: </span>
                    {post.category}
                </div>
                <div className="post-view-body">
                    {post.body}
                </div>

                <div className="post-container">
                    <div className="post-element">
                        <CommentsIcon size={20} />
                        {post.commentCount}
                    </div>
                    <div className="post-element">
                        <button onClick={()=>this.props.upVotePost(post)}>
                        <UpVoteIcon size={20} />
                        </button>
                    </div>
                    <div className="post-element">
                        {post.voteScore}
                    </div>
                    <div className="post-element">
                        <button onClick={()=>this.props.downVotePost(post)}>
                            <DownVoteIcon size={20} />
                        </button>
                    </div>
                    <div className="post-element">
                        <Link to={{ pathname: '/edit', state: {postData: post} }}>
                            <button>edit</button>
                        </Link>
                    </div>
                    <div className="post-element">
                        <button 
                            onClick={()=>this.props.deletePost(post.id)}>delete</button>
                    </div>
                </div>

                <div className="post-view-comments">
                    <h3>Comentarios:</h3>
                    {/* if state then comments, else create comment button*/}

                    {this.props.commentReducer.comments.map((comment) => 
                        <div key={comment.id} className="comment-content">

                            <div className="comment-body">
                                {comment.body}
                            </div>
                            <div className="comment-author">
                                <span className="comment-author-author">author: </span>
                                {comment.author}
                            </div>

                            <div className="post-container">
                                <div className="post-element">
                                    <button className="comment-button"
                                        onClick={()=>this.props.upVoteComment(comment)}>
                                        <UpVoteIcon size={20} />
                                    </button>
                                </div>
                                <div className="post-element">
                                    {comment.voteScore}
                                </div>
                                <div className="post-element">
                                    <button className="comment-button"
                                        onClick={()=>this.props.downVoteComment(comment)}>
                                        <DownVoteIcon size={20} />
                                    </button>
                                </div>
                                <div className="post-element">
                                    <Link to="/edit-comment">
                                        <button className="comment-button">
                                            edit
                                        </button>
                                    </Link>
                                </div>
                                <div className="post-element">
                                    <button className="comment-button"
                                        onClick={()=>this.props.deleteComment(comment.id)}>
                                        delete
                                    </button>
                                </div>
                            </div>

                        </div>
                    )}
                    
                    <div>
                        {showCreateComment}
                    </div>
                </div>
            </div>

        )
    }}


function mapStateToProps (state){
  
  console.log('state - post.js (mapstateToProps)', state)
  //let array = Object.values(postReducer)
  return state


}

function mapDispatchToProps(dispatch){
  return {
    saveAPost: (postId) => dispatch(fetchAPost(postId)),
    saveComments: (postId) => dispatch(fetchComments(postId)),
    addComment: (newComment) => dispatch(newComment(newComment)),
    editComment: (comment) => dispatch(changeComment(comment)),
    deleteComment: (commentId) => dispatch(eraseComment(commentId)),
    upVoteComment: (comment) => dispatch(likeComment(comment)),
    downVoteComment: (comment) => dispatch(notLikeComment(comment)),
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

