import { SAVE_CATEGORIES } from './actionTypes'

/* save categories in store */
export function fetchCategories(){
    return function (dispatch){
        fetch('/categories',
            {
                headers: { 'Authorization': 'fercategories' }
            }
        ).then(res => res.json())
         .then(data => {dispatch(saveCategoriesInStore(data))})
    }
}

export function saveCategoriesInStore( data ) {
    return {
        type: SAVE_CATEGORIES,
        categories: data.categories,
    }
}



