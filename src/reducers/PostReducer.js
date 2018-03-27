import { SAVEPOST_INSTORE, SAVE_A_POST, ADDPOST_TOSTORE, DELETEPOST_FROMSTORE } from '../actions/actionTypes'
import { UPVOTE_POST, DOWNVOTE_POST, EDIT_POST } from '../actions/actionTypes'
import { ADD_COMMENT, DELETE_COMMENT } from "../actions/actionTypes";

const initialState = {
    posts: [],
    post: null,
}

export function postReducer (state = initialState, action) {
    const { postList, newPost, postId, post} = action
    switch (action.type) {

        case SAVEPOST_INSTORE :
            console.log('initial store', initialState)
            console.log('postList (reducer)', postList)
            return Object.assign({}, state, {posts: postList})

        case SAVE_A_POST :
            console.log('save a post (reducer)', post)
            return Object.assign({}, state, {post: post})

        case ADDPOST_TOSTORE :
            console.log('newPost (reducer)', newPost)
            return {
                ...state,
                posts: state.posts.concat(newPost)
            }

        case DELETEPOST_FROMSTORE :
            console.log('delete post (reducer)', postId)
            return {
                posts: state.posts.filter(post => postId !== post.id)
            }

        case UPVOTE_POST :
            console.log('upvote post (reducer)', post)
            let arrayP = state.posts.map((item) => { if (item.id === post.id) {return post} else {return item}})
            return {
                posts : arrayP
            }

        case DOWNVOTE_POST :
            console.log('downvote post (reducer)', post)
            let array = state.posts.map((item) => { if (item.id === post.id) {return post} else {return item}})
            return {
                posts : array
            }

        case EDIT_POST :
            console.log('edit post (reducer)', post)
            let newState = state.posts.filter(p => p.id !== post.id)
            return {
                posts: newState.concat(post)
            }

        case ADD_COMMENT :
            let arrayA = state.posts.map((item) => { if (item.id === postId) {return item.commentCount = item.commentCount + 1 } else {return item}})
            return {
                posts: arrayA,
            }

        case DELETE_COMMENT :
            let arrayD = state.posts.map((item) => { if (item.id === postId) {return item.commentCount = item.commentCount - 1 } else {return item}})
            return {
                posts: arrayD,
            }
        default :
            return state
    }
}