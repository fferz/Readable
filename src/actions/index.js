export const SAVEPOST_INSTORE = 'SAVEPOST_INSTORE'
export const SAVE_A_POST = 'SAVE_A_POST'
export const ADDPOST_TOSTORE = 'ADDPOST_TOSTORE'
export const DELETEPOST_FROMSTORE = 'DELETEPOST_FROMSTORE'
export const UPVOTE_POST = 'UPVOTE_POST'
export const DOWNVOTE_POST = 'DOWNVOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETEALLCOMMENTS = 'DELETEALLCOMMENTS'
export const UPCOMMENT_COUNT = 'UPCOMMENT_COUNT'

/* save posts in store OK*/

export function fetchPosts(){
    return function(dispatch){
        fetch('http://localhost:3001/posts',
            {
                headers: { 'Authorization': 'readable-app' }
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

/* ask for a single post OK*/
export function fetchAPost(postId){
    return function(dispatch){
        fetch(`/posts/${postId}`,
            {
                headers: { 'Authorization': 'readable-app' }
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

/* new post OK*/

export function newPostToStore( newPost ){
    return function(dispatch){
        fetch('http://localhost:3001/posts',{
            method: 'POST',
            body: JSON.stringify(newPost),
            headers: { 'Authorization': 'readable-app',
                       'Content-Type': 'application/json',
                       'Accept': 'application/json' },
        }
        ).then(res => res.json())
         .then((data) =>  {dispatch(addPostToStore(data))})
         .catch((e) => e.message)
    }
}

export function addPostToStore( data ){
    console.log('accion new post to store', data)
    return {
        type: ADDPOST_TOSTORE,
        newPost:  data,
    }
}

/* delete post OK*/

export function deletePost( postId ){
    return function(dispatch){
        fetch(`http://localhost:3001/posts/${postId}`,{
            method: 'DELETE',
            headers: { 'Authorization': 'readable-app' },
        }
        ).then(res => {res.json(), console.log('res', res)})     
         .then((data) =>  {dispatch(deletePostFromStore( postId ))
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
    let upVote = {}
    upVote.option = 'upVote'
    return function(dispatch){
        fetch(`/posts/${post.id}`,{
            method: 'POST',
            body: JSON.stringify(upVote),
            headers: { 'Authorization': 'readable-app',
                       'Content-Type': 'application/json'},
        }
        ).then(res => res.json())     
         .then((data) =>  {dispatch(upVotePost( data ))
            }
        )
    }
}

export function upVotePost(post){
    console.log('accion upvote post', post)
    return {
        type: UPVOTE_POST,
        post,
    }
}

/* downvote post */

export function notLikePost(post){
    let downVote = {}
    downVote.option = 'downVote'
    return function(dispatch){
        fetch(`/posts/${post.id}`,{
                method: 'POST',
                body: JSON.stringify(downVote),
                headers: { 'Authorization': 'readable-app',
                    'Content-Type': 'application/json'},
            }
        ).then(res => res.json())
            .then((data) =>  {dispatch(downVotePost( data ))
                }
            )
    }
}

export function downVotePost(data){
    console.log('accion downvote post', data)
    return {
        type: DOWNVOTE_POST,
        post: data,
    }
}

/* edit post OK */

export function changePost(post){
    let editedPost = {}
    editedPost.title = post.title
    editedPost.body = post.body
    return function(dispatch){
        fetch(`http://localhost:3001/posts/${post.id}`,{
            method: 'PUT',
            body: JSON.stringify(editedPost),
            headers: {  'Authorization': 'readable-app',
                       'Content-Type': 'application/json'},
        }
        ).then(res => res.json())     
         .then((data) =>  {dispatch(editPost( data ))
            }
        )
    }
}

export function editPost(data){
    console.log('accion edit post', data)
    return {
        type: EDIT_POST,
        post: data,
    }
}

/* commentCount +1*/
export function upCommentCount( data ){
    return {
        type: UPCOMMENT_COUNT,
        postId: data.parentId,
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
