import { SAVE_CATEGORIES } from '../actions/actionTypes'

const initialState = {
    categories: [],
}

export function categoryReducer (state = initialState, action) {
    const { categories } = action
    switch (action.type) {

        case SAVE_CATEGORIES :
            return Object.assign({}, state, {categories: categories})
        default :
            return state
    }
}