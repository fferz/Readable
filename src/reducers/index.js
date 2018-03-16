import { SAVEPOST_INSTORE, ADDPOST_TOSTORE, DELETEPOST_FROMSTORE } from '../actions'
import { UPVOTE_POST, DOWNVOTE_POST, EDIT_POST } from '../actions'
import { SAVECOMMENTS_INSTORE, ADD_COMMENT, EDIT_COMMENT} from '../actions/CommentsAction'
import { DELETE_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT} from '../actions/CommentsAction'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

const initialState = {
    posts: [],
    editPost: null,
    comments: [],
}

function postReducer (state = initialState, action) {
    const { postList, newPost, postId, post, voteScore } = action
    switch (action.type) {

        case SAVEPOST_INSTORE : //va en reducer posts
        console.log('initial store', initialState)
        console.log('postList (reducer)', postList)
            return Object.assign({}, state, {posts: postList})

        case ADDPOST_TOSTORE : 
        console.log('newPost (reducer)', newPost)
            return { 
                ...state,
                posts: state.posts.concat(newPost)
            }

        case DELETEPOST_FROMSTORE :
        console.log('delete post (reducer)', postId)
            return {
                posts: state.posts.filter(post => postId !== post.id),
                commens: state.comments.filter(c => c.parentId !== postId)
            }

        case UPVOTE_POST :
        console.log('upvote post (reducer)', post)
            return {
                ...state,

            }

        case DOWNVOTE_POST :
        console.log('downvote post (reducer)', post)
            return {
                ...state,

            }

        case EDIT_POST :
        console.log('edit post (reducer)', post)
        let newState = state.posts.filter(p => p.id !== post.id)
            return {
                posts: newState.concat(post)
            }

        default :
            return state
    }
}

function commentReducer (state = initialState, action) {
    const { postId, comment, commentId, comments, newComment } = action
    switch (action.type) {

        case SAVECOMMENTS_INSTORE :
            return Object.assign({}, state, {comments: comments})
            
        case ADD_COMMENT :
            return {
                ...state,
                comments: state.comments.concat(newComment)
            }
        case EDIT_COMMENT :
            let newState = state.comments.filter(c => c.id !== c.id)
            return {
                comments: newState.concat(comment)
            }
        case DELETE_COMMENT :
            return {
                comments: state.comments.filter(c => c.id !== commentId)
            }
        case UPVOTE_COMMENT :
            return {
                ...state,
                
            }
        case DOWNVOTE_COMMENT :
            return {
                ...state,
                
            }
        default :
            return state
    }
}

/*
        case UPVOTE_COMMENT :
            return {
                ...state,
                [post]: {
                    ...state[post],
                    voteScore: votes + 1,
                }
            }
        case DOWNVOTE_COMMENT :
            return {
                ...state,
                [post]: {
                    ...state[post],
                    voteScore: votes - 1,
                }
            }
  */

export default combineReducers({
    commentReducer,
    postReducer,
    form: formReducer,
});