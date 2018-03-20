export const SAVECOMMENTS_INSTORE = 'SAVECOMMENTS_INSTORE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'

/*save all the comments in store */

export function fetchComments(postId){
    return function(dispatch){
        fetch(`/posts/${postId}/comments`,
        {
            headers: { 'Authorization': 'post-comments' }
        }
        )
        .then(res => res.json())
        .then(comments => {dispatch(saveCommentsInStore( comments)), console.log('comments', comments, postId)}
        )
    }
}

export function saveCommentsInStore( comments ) {
    console.log('entro a la accion saveCommentsInStore', comments )
    return {
        type: SAVECOMMENTS_INSTORE,
        comments,
    }
}

/* create a comment */

export function newComment( newComment){
    return function(dispatch){
        fetch('/comments',{
            method: 'POST',
            body: JSON.stringify({newComment}),
            headers: { 'Authorization': 'addNewComment' },
            'Content-Type': 'application/json'
        }
        ).then(res => {res.json(), console.log('res', res)})     
         .then(() =>  {dispatch(addComment(  newComment ))
            }
        )
    }
}

export function addComment( newComment ){
    console.log('accion addComments', newComment)
    return {
        type: ADD_COMMENT,
        newComment,
    }
}

/* edit a comment */

export function changeComment(comment){
    return function(dispatch){
        fetch(`/comments/${comment.id}`,{
            method: 'PUT',
            body: JSON.stringify({comment}),
            headers: { 'Authorization': 'editComment' }
        }
        ).then(res => {res.json(), console.log('res', res)})     
         .then(() =>  {dispatch(editComment( comment ))
            }
        )
    }
}

export function editComment(comment){
    console.log('accion editComment', comment)
    return {
        type: EDIT_COMMENT,
        comment,
    }
}

/* delete a comment */

export function eraseComment( commentId ){
    return function(dispatch){
        fetch(`/comments/${commentId}`,{
            method: 'DELETE',
            headers: { 'Authorization': 'delete-comment' },
        }
        ).then(res => {res.json(), console.log('res', res)})     
         .then(comment =>  {dispatch(deleteComment( commentId ))
            }
        )
    }
}

export function deleteComment( commentId ){
    console.log('accion deleteComment', commentId)
    return {
        type: DELETE_COMMENT,
        commentId,
    }
}

/* upvote a comment */

export function likeComment(comment){
    return function(dispatch){
        fetch(`/comments/${comment.id}`,{
            method: 'POST',
            body: {option: 'upVote'},
            headers: { 'Authorization': 'upvoteComment' },
        }
        ).then(res => res.json())     
         .then(() =>  {dispatch(upVoteComment( comment ))
            }
        )
    }
}

export function upVoteComment( comment ) {
    return {
        type: UPVOTE_COMMENT, //what event took place
        comment,
        voteScore: comment.voteScore,
    }
}

/* downvote a comment */

export function notLikeComment(comment){
    return function(dispatch){
        fetch(`/comments/${comment.id}`,{
            method: 'POST',
            body: {option: 'downVote'},
            headers: { 'Authorization': 'upvoteComment' },
        }
        ).then(res => res.json())     
         .then(() =>  {dispatch(downVoteComment( comment ))
            }
        )
    }
}

export function downVoteComment(comment ) {
    return {
        type: DOWNVOTE_COMMENT,
        comment,
        voteScore: comment.voteScore,
    }
}







