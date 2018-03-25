export const SAVECOMMENTS_INSTORE = 'SAVECOMMENTS_INSTORE'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'


/*save all the comments in store */

export function fetchComments(postId){
    return function(dispatch){
        fetch(`http://localhost:3001/posts/${postId}/comments`,
        {
            headers: { 'Authorization': 'readable-app' }
        }
        )
        .then(res => res.json())
        .then(comments => {dispatch(saveCommentsInStore( comments))}
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
        fetch('http://localhost:3001/comments',{
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: { 'Authorization': 'readable-app',
                       'Content-Type': 'application/json',
                       'Accept': 'application/json' },
        }
        ).then(res => res.json())     
         .then((data) => { dispatch(addComment( data ))})
    }
}

export function addComment( data ){
    console.log('accion addComments', data)
    return {
        type: ADD_COMMENT,
        newComment: data,
        postId: data.parentId,
    }
}



/* edit a comment */

export function changeComment(comment){
    let editedComment = {}
    editedComment.timestamp = comment.timestamp
    editedComment.body = comment.body
    return function(dispatch){
        fetch(`http://localhost:3001/comments/${comment.id}`,{
            method: 'PUT',
            body: JSON.stringify(editedComment),
            headers: {'Authorization': 'readable-app',
                       'Content-Type': 'application/json'},
        }
        ).then(res => res.json())     
         .then((data) =>  {dispatch(editComment( data ))
            }
        )
    }
}

export function editComment(data){
    console.log('accion editComment', data)
    return {
        type: EDIT_COMMENT,
        comment: data,
    }
}

/* delete a comment */

export function eraseComment( commentId ){
    return function(dispatch){
        fetch(`http://localhost:3001/comments/${commentId}`,{
            method: 'DELETE',
            headers: { 'Authorization': 'readable-app' },
        }
        ).then(res => res.json())     
         .then(data =>  {dispatch(deleteComment( commentId ))
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
    let upVote = {}
    upVote.option = 'upVote'
    return function(dispatch){
        fetch(`/comments/${comment.id}`,{
            method: 'POST',
            body: JSON.stringify(upVote),
            headers: { 'Authorization': 'readable-app',
                       'Content-Type': 'application/json'},
        }
        ).then(res => res.json())     
         .then((data) =>  {dispatch(upVoteComment( data ))
            }
        )
    }
}

export function upVoteComment( data ) {
    return {
        type: UPVOTE_COMMENT, 
        comment: data
    }
}

/* downvote a comment */

export function notLikeComment(comment){
    let downVote = {}
    downVote.option = 'downVote'
    return function(dispatch){
        fetch(`/comments/${comment.id}`,{
            method: 'POST',
            body: JSON.stringify(downVote),
            headers: { 'Authorization': 'readable-app',
                    'Content-Type': 'application/json'},
        }
        ).then(res => res.json())     
         .then((data) =>  {dispatch(downVoteComment( data ))
            }
        )
    }
}

export function downVoteComment(data ) {
    return {
        type: DOWNVOTE_COMMENT,
        comment: data,
    }
}







