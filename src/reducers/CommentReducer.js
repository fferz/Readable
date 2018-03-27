import { SAVECOMMENTS_INSTORE, ADD_COMMENT, EDIT_COMMENT} from '../actions/actionTypes'
import { DELETE_COMMENT, UPVOTE_COMMENT, DOWNVOTE_COMMENT } from '../actions/actionTypes'

const initialState = {
    comments: [],
}

export function commentReducer (state = initialState, action) {
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
            let newState = state.comments.filter(c => c.id !== comment.id)
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