import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Route} from 'react-router-dom'
import AddIcon from 'react-icons/lib/fa/plus-circle'
import DownVoteIcon from 'react-icons/lib/fa/hand-o-down'
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up'
import CommentsIcon from 'react-icons/lib/fa/comment-o'
import { deletePost, likePost, notLikePost } from '../actions'
import PostFormContainer from './PostFormContainer.js'

class Post extends Component{

    render(){
    console.log('props (Post.js)', this.props)

        return(
        <div className="post-content">

            {/* y si guardo en el estado de app el postDataView?*/}

                {this.props.posts.map((post) =>
                    <div key={post.id}> 
                            <div className="post-title">
                                <Link to={{ pathname: `/post/post-view`, state: {postDataView: post} }}>
                                    {post.title}
                                </Link>
                            </div>
                            <div className="post-author">{post.author}</div>
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
                                    <Link to={{ pathname: '/edit', state: {postData: post} }}>
                                        <button>edit</button>
                                    </Link>
                                </div>
                                <div className="post-element">
                                    <button 
                                        onClick={()=>this.props.deletePost(post.id)}>delete</button>
                                </div>
                            </div>
                        </div>
                )}
        </div>
        
    )}}

function mapStateToProps (state){
  
  console.log('state - post.js (mapstateToProps)', state)
  //let array = Object.values(postReducer)
  return state

}

function mapDispatchToProps(dispatch){
  return {
    deletePost: (postId) => dispatch(deletePost(postId)),
    upVotePost: (post) => dispatch(likePost(post)),
    downVotePost: (post) => dispatch(notLikePost(post)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)

