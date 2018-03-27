import { postReducer } from './PostReducer'
import { commentReducer } from './CommentReducer'
import { categoryReducer } from './CategoryReducer'
import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'


export default combineReducers({
    categoryReducer,
    commentReducer,
    postReducer,
    form: formReducer,
});