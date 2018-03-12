export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const SAVEPOST_INSTORE = 'SAVEPOST_INSTORE'
export const ADDPOST_TOSTORE = 'ADDPOST_TOSTORE'
export const DELETEPOST_FROMSTORE = 'DELETEPOST_FROMSTORE'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const EDIT_POST = 'EDIT_POST'

export function upvoteComment({ votes, postId }) {
    return {
        type: UPVOTE_COMMENT, //what event took place
        votes,
        postId,
    }
}

export function downvoteComment({ votes, postId }) {
    return {
        type: DOWNVOTE_COMMENT,
        votes,
        postId,
    }
}

export function savePostInStore( postList ) {
    console.log('entro a la accion savePostInStore',postList )
    return {
        type: SAVEPOST_INSTORE,
        postList,
    }
}

export function addPostToStore( newPost ){
    console.log('accion new post to store', newPost)
    return {
        type: ADDPOST_TOSTORE,
        newPost,
    }
}

export function deletePostFromStore( postId ){
    console.log('accion delete post', postId)
    return {
        type: DELETEPOST_FROMSTORE,
        postId,
    }
}

export function upVotePost(post){
    console.log('accion upvote post', post)
    return {
        type: UPVOTE_POST,
        post,
        voteScore: post.voteScore,
    }
}

export function downVotePost(post){
    console.log('accion downvote post', post)
    return {
        type: DOWNVOTE_POST,
        post,
        voteScore: post.voteScore,
    }
}

export function editPost(post){
    console.log('accion edit post', post)
    return {
        type: EDIT_POST,
        post,
    }
}

/*
export function changePost(post){
    return function(dispatch){
        fetch(`/posts/${post.id}`,{
            method: 'PUT',
            body: JSON.stringify({post}),
            headers: { 'Authorization': 'posts-changePost' },
        }
        ).then(res => res.json())     
         .then(posts =>  {dispatch(editPost( post ))
            }
        )
    }
}*/

export function likePost(post){
    return function(dispatch){
        fetch(`/posts/${post.id}`,{
            method: 'POST',
            headers: { 'Authorization': 'posts-downvotePost' },
        }
        ).then(res => res.json())     
         .then(posts =>  {dispatch(upVotePost( post ))
            }
        )
    }
}

export function notLikePost(post){
    return function(dispatch){
        fetch(`/posts/${post.id}`,{
            method: 'POST',
            headers: { 'Authorization': 'posts-upvotePost' },
        }
        ).then(res => res.json())     
         .then(posts =>  {dispatch(downVotePost( post ))
            }
        )
    }
}

export function deletePost( postId ){
    return function(dispatch){
        fetch(`/posts/${postId}`,{
            method: 'DELETE',
            headers: { 'Authorization': 'posts-deletePost' },
        }
        ).then(res => {res.json(), console.log('res', res)})     
         .then(posts =>  {dispatch(deletePostFromStore( postId ))
            }
        )
    }
}

//this does not work, I don't know why :(, please help me!
export function newPostToStore( newPost ){
    return function(dispatch){
        fetch('http://localhost:3001/posts',{
            method: 'POST',
            body: JSON.stringify({newPost}),
            headers: { 'Authorization': 'posts-addNewPost' },
            'Content-Type': 'application/json'
        }
        ).then(res => {res.json(), console.log('res', res)})     
         .then(posts =>  {dispatch(addPostToStore( newPost ))
            }
        )
    }
}

export function fetchPosts(){
    return function(dispatch){
        fetch('/posts',
            {
                headers: { 'Authorization': 'fer' }
            }
        ).then(res => res.json())
        .then(posts =>  {dispatch(savePostInStore(posts))
            }
        )
    }
}


const arrayToObject = (array) => {
    console.log('entro a la funcion arrayToObj', array)
    let objeto = array.reduce((obj, item) => {
            obj[item.id] = item
            return obj
        }, {})
    return objeto
}
