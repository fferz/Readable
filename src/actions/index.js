export const UPVOTE_COMMENT = 'UPVOTE_COMMENT'
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT'
export const SAVEPOST_INSTORE = 'SAVEPOST_INSTORE'
export const ADDPOST_TOSTORE = 'ADDPOST_TOSTORE'

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

/*
.then(posts =>  { 
            console.log('posts (fetchPosts - action)', posts)
            let arrayToObj = arrayToObject( posts )
            console.log('posts (object - action)', arrayToObj)
            dispatch(savePostInStore(arrayToObj))
            }
        )
*/

const arrayToObject = (array) => {
    console.log('entro a la funcion arrayToObj', array)
    let objeto = array.reduce((obj, item) => {
            obj[item.id] = item
            return obj
        }, {})
    return objeto
}
