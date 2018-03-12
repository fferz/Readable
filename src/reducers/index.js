import { UPVOTE_COMMENT, DOWNVOTE_COMMENT, SAVEPOST_INSTORE, ADDPOST_TOSTORE, DELETEPOST_FROMSTORE } from '../actions'
import { UPVOTE_POST, DOWNVOTE_POST, EDIT_POST } from '../actions'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

const initialPostState = {
    posts: [],
    //newPosts: [],
    editPost: null,
}

function postReducer (state = initialPostState, action) {
    const { postList, newPost, postId, post, voteScore } = action
    switch (action.type) {
        case SAVEPOST_INSTORE : //va en reducer posts
        console.log('initial store', initialPostState)
        console.log('postList (reducer)', postList)
            return Object.assign({}, state, {posts: postList})
        case ADDPOST_TOSTORE : 
        console.log('newPost (reducer)', newPost)
            return { 
                ...state,
                //newPosts: state.newPosts.concat(newPost)
                posts: state.posts.concat(newPost)
            }
        case DELETEPOST_FROMSTORE :
        console.log('delete post (reducer)', postId)
            return {
                posts: state.posts.filter(post => postId !== post.id),
                //newPosts: state.newPosts.filter(post => postId !== post.id)
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

/*function vote (state = initialPostState, action){
    const { votes, post } = action
    switch (action.type) {
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
        default :
            return state
    }
}*/

//export default vote;

export default combineReducers({
    postReducer,
    form: formReducer,
});