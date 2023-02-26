import store from "../store";

export const fillBookForm = (val, name) => {
    store.dispatch({type: 'FILL_BOOK_FIELD', payload: val, name})
}
export const checkBookForm = () => {
    store.dispatch({type: 'CHECK_BOOK_FORM'})
}
export const showHideBookForm = (val, mode) => {
    store.dispatch({type: 'SHOW/HIDE_BOOK_FORM', payload: val, mode})
}

export const autoFillBookForm = (book) => {
    store.dispatch({type: 'AUTOFILL_BOOK_FORM', payload: book})
}
export const clearBookForm = () => {
    store.dispatch({type: 'CLEAR_BOOK_FORM'})
}