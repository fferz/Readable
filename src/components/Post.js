import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import DownVoteIcon from 'react-icons/lib/fa/hand-o-down'
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up'
import CommentsIcon from 'react-icons/lib/fa/comment-o'
import { deletePost, notLikePost, likePost } from "../actions/PostsAction";

class Post extends Component{


    render(){

    const posts = this.props.posts ? this.props.posts : this.props.postReducer.posts


        return(
        <div className="post-content">

            {posts.map((post) =>
                <div key={post.id}>
                    <div className="post-title">
                        <Link to={`/post/${post.id}`} >
                            {post.title}
                        </Link>
                    </div>
                    <div className="post-author">
                         {post.author}
                    </div>
                    <div className="post-category">category:{post.category}</div>
                    <div className="post-container">
                        <div className="post-element">
                            <CommentsIcon size={20} />
                            {post.commentCount}</div>
                        <div className="post-element">
                            <button onClick={()=>this.props.upVotePost(post)}>
                            <UpVoteIcon size={20} />
                            </button>
                        </div>
                        <div className="post-element">{post.voteScore}</div>
                        <div className="post-element">
                            <button onClick={()=>this.props.downVotePost(post)}>
                                <DownVoteIcon size={20} />
                            </button>
                        </div>
                        <div className="post-element">
                            <Link to={ `/post/${post.id}/edit`}>
                                <button >edit</button>
                            </Link>
                        </div>
                        <div className="post-element">
                            <button onClick={()=>this.props.deletePost(post.id)}>delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
    )}}

function mapStateToProps (state){
    return state
}

function mapDispatchToProps(dispatch){
    return {
        deletePost: (postId) => dispatch(deletePost(postId)),
        upVotePost: (post) => dispatch(likePost(post)),
        downVotePost: (post) => dispatch(notLikePost(post)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))


