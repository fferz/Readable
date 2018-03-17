export const SAVEPOST_INSTORE = 'SAVEPOST_INSTORE'
export const SAVE_A_POST = 'SAVE_A_POST'
export const ADDPOST_TOSTORE = 'ADDPOST_TOSTORE'
export const DELETEPOST_FROMSTORE = 'DELETEPOST_FROMSTORE'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETEALLCOMMENTS = 'DELETEALLCOMMENTS'

/* save posts in store */

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

export function savePostInStore( postList ) {
    console.log('entro a la accion savePostInStore',postList )
    return {
        type: SAVEPOST_INSTORE,
        postList,
    }
}

/* ask for a single post */
export function fetchAPost(postId){
    return function(dispatch){
        fetch(`/posts/${postId}`,
            {
                headers: { 'Authorization': 'fer' }
            }
        ).then(res => res.json())
        .then(post =>  {dispatch(saveAPost(post))
            }
        )
    }
}

export function saveAPost( post ) {
    console.log('entro a la accion save a post',post )
    return {
        type: SAVE_A_POST,
        post,
    }
}

/* new post */
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
         .then(newPost =>  {dispatch(addPostToStore( newPost ))
            }
        )
    }
}

export function addPostToStore( newPost ){
    console.log('accion new post to store', newPost)
    return {
        type: ADDPOST_TOSTORE,
        newPost,
    }
}

/* delete post */

export function deletePost( postId ){
    return function(dispatch){
        fetch(`/posts/${postId}`,{
            method: 'DELETE',
            body: {option: 'downVote'},
            headers: { 'Authorization': 'posts-deletePost' },
        }
        ).then(res => {res.json(), console.log('res', res)})     
         .then(() =>  {dispatch(deletePostFromStore( postId ))
            }
        )
    }
}

export function deletePostFromStore( postId ){
    console.log('accion delete post', postId)
    return {
        type: DELETEPOST_FROMSTORE,
        postId,
    }
}

/* upvote post */

export function likePost(post){
    return function(dispatch){
        fetch(`/posts/${post.id}`,{
            method: 'POST',
            body: {option: 'upVote'},
            headers: { 'Authorization': 'posts-downvotePost' },
        }
        ).then(res => res.json())     
         .then(post =>  {dispatch(upVotePost( post ))
            }
        )
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

/* downvote vost */

export function notLikePost(post){
    return function(dispatch){
        fetch(`/posts/${post.id}`,{
            method: 'POST',
            headers: { 'Authorization': 'posts-upvotePost' },
        }
        ).then(res => res.json())     
         .then(post =>  {dispatch(downVotePost( post ))
            }
        )
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

/* edit post */

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

export function editPost(post){
    console.log('accion edit post', post)
    return {
        type: EDIT_POST,
        post,
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
