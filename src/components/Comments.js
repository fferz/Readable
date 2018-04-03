import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import DownVoteIcon from 'react-icons/lib/fa/hand-o-down'
import UpVoteIcon from 'react-icons/lib/fa/hand-o-up'
import {  eraseComment, likeComment, notLikeComment } from '../actions/CommentsAction'

class Comments extends React.Component {

    render(){
        console.log('comments', this.props)

        return(
            <div className="post-view-comments">
                <h3>Comentarios:</h3>

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
                                <Link to={{ pathname: `/post/${comment.parentId}/edit-comment`, state: {commentData: comment} }}>
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


            </div>
        )
    }
}

function mapStateToProps (state){
    return state
}

function mapDispatchToProps(dispatch){
    return {
        deleteComment: (commentId) => dispatch(eraseComment(commentId)),
        upVoteComment: (comment) => dispatch(likeComment(comment)),
        downVoteComment: (comment) => dispatch(notLikeComment(comment)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
