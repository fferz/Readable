import React from 'react'
import { connect } from 'react-redux'
import AddIcon from 'react-icons/lib/fa/plus-circle'
import DownVoteIcon from 'react-icons/lib/fa/hand-o-down'
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up'
import CommentsIcon from 'react-icons/lib/fa/comment-o'
import { deletePostFromStore } from './actions'
import './App.css'

const Post = (props) => {
   console.log('props (Post.js)', props)

        return(
        <div className="post-content">
            {props.posts.map((post) => 
                <div key={post.id}> 
                        <div className="post-title">{post.title}</div>
                        <div className="post-author">{post.author}</div>
                        <div className="post-category">category:{post.category}</div> 
                        <div className="post-container">
                            <div className="button-vote">
                                <CommentsIcon size={20} />
                                {post.commentCount}</div>
                            <div className="button-vote">
                                <button>
                                <UpVoteIcon size={20} />
                                </button>
                            </div>
                            <div className="button-vote">{post.voteScore}</div>
                            <div className="button-vote">
                                <button className="downVoteButton">
                                    <DownVoteIcon size={20} />
                                </button>
                            </div>
                            <div className="button-vote">
                                <button >edit</button>
                            </div>
                            <div className="button-vote">
                                <button 
                                    onClick={()=>props.deletePost(post.id)}>delete</button>
                            </div>
                        </div>
                    </div>
            )}
        </div>
        
    )}


function mapStateToProps (state){
  
  console.log('state - post.js (mapstateToProps)', state)
  //let array = Object.values(postReducer)
  return state

}

function mapDispatchToProps(dispatch){
  return {
    deletePost: (postId) => dispatch(deletePostFromStore(postId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)


