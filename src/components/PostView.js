import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import DownVoteIcon from 'react-icons/lib/fa/hand-o-down'
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up'
import CommentsIcon from 'react-icons/lib/fa/comment-o'
import { deletePost, likePost, notLikePost, fetchAPost } from '../actions/PostsAction'
import { fetchComments } from '../actions/CommentsAction'
import CommentFormContainer from './CommentFormContainer'
import Comments from './Comments'

class PostView extends Component{

    state = {
        comments : [],
        post: null,
        newCommentFlag : false,
    }

    componentDidMount(){

        console.log('component DID mount',this.props.postDataView.id)
        this.props.saveAPost(this.props.postDataView.id)
        this.props.saveComments(this.props.postDataView.id)
        
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

        let showCreateComment = null
        if (this.state.newCommentFlag === false) {
            showCreateComment = <button className="comment-button" onClick={this.showNewCommentForm}>
                new comment
            </button>
        } else {
            this.showNewCommentButton
            showCreateComment = <CommentFormContainer />
        }

        const post  = this.props.postDataView ? this.props.postDataView : this.props.postReducer.post
        
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
                            <button >edit</button>
                        </Link>
                    </div>
                    <div className="post-element">
                        <button 
                            onClick={()=>this.props.deletePost(post.id)}>delete</button>
                    </div>
                </div>

                <Comments />

                <div>
                    {showCreateComment}
                </div>
                
            </div>

        )
    }}


function mapStateToProps (state, ownProps){
  
    console.log('state POSTVIEW - post.js (mapstateToProps)', state)
    //let array = Object.values(postReducer)
    return state


}

function mapDispatchToProps(dispatch){
    return {
        saveAPost: (postId) => dispatch(fetchAPost(postId)),
        saveComments: (postId) => dispatch(fetchComments(postId)),
        deletePost: (postId) => dispatch(deletePost(postId)),
        upVotePost: (post) => dispatch(likePost(post)),
        downVotePost: (post) => dispatch(notLikePost(post)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)

