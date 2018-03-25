import { SAVEPOST_INSTORE, SAVE_A_POST, ADDPOST_TOSTORE, DELETEPOST_FROMSTORE } from '../actions'
import { UPVOTE_POST, DOWNVOTE_POST, EDIT_POST, UPCOMMENT_COUNT } from '../actions'
import { SAVECOMMENTS_INSTORE, ADD_COMMENT, EDIT_COMMENT} from '../actions/CommentsAction'
import { DELETE_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT } from '../actions/CommentsAction'
import { SAVE_CATEGORIES } from '../actions/CategoriesAction'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

const initialState = {
    categories: [],
    posts: [],
    post: null,
    comments: [],
}

function categoryReducer (state = initialState, action) {
    const { categories } = action
    switch (action.type) {

        case SAVE_CATEGORIES :
            return Object.assign({}, state, {categories: categories})
        default :
            return state
    }
}

function postReducer (state = initialState, action) {
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

function commentReducer (state = initialState, action) {
    const { comment, commentId, comments, newComment, postId } = action
    switch (action.type) {

        case SAVECOMMENTS_INSTORE :
            return Object.assign({}, state, {comments: comments})
            
        case ADD_COMMENT :
            return {
                ...state,
                comments: state.comments.concat(newComment),
            }
        case EDIT_COMMENT :
            let newState = state.comments.filter(c => c.id !== c.id)
            return {
                comments: newState.concat(comment)
            }
        case DELETE_COMMENT :
            return {
                ...state,
                comments: state.comments.filter(c => c.id !== commentId),
            }
        case UPVOTE_COMMENT :
            let commentsArray = state.comments.map((item) => { if (item.id === comment.id) {return comment} else {return item}})
            return {
                comments: commentsArray
                
            }
        case DOWNVOTE_COMMENT :
            let commentsArray2 = state.comments.map((item) => { if (item.id === comment.id) {return comment} else {return item}})
            return {
                comments: commentsArray2

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
    categoryReducer,
    commentReducer,
    postReducer,
    form: formReducer,
});