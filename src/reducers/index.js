import { UPVOTE_COMMENT, DOWNVOTE_COMMENT, SAVEPOST_INSTORE } from '../actions'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

const initialPostState = {
    posts: []
}

function postReducer (state = initialPostState, action) {
    const { postList } = action
    switch (action.type) {
        case SAVEPOST_INSTORE : //va en reducer posts
        console.log('initial store', initialPostState)
        console.log('postList (reducer)', postList)
            return Object.assign({}, state, {posts: postList})
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