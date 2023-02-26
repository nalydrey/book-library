const initialForm = {
    // id: '',
    // author: '',
    name: '',
    pages: '',
    genre: '',
    isOpen: false,
    isValid: false,
    isEdit: false
}

export const reducerBookForm = (state=initialForm, action) => {
    switch(action.type){
        case 'FILL_BOOK_FIELD': return {...state, [action.name]: action.payload}
        case 'CHECK_BOOK_FORM': {
            console.log(!!(state.name && state.pages && state.genre))
            const newStatus = !!(state.name && state.pages && state.genre)
            return {...state, isValid: newStatus}
        }
        case 'SHOW/HIDE_BOOK_FORM': {
            console.log(action)
            return {...state, isOpen: action.payload, isEdit: action.mode}
        }
        case 'CLEAR_BOOK_FORM': return {...initialForm}
        case 'AUTOFILL_BOOK_FORM': {
            console.log(action.payload)
            return {...state, name: action.payload.name,
                              pages: action.payload.pageCount,
                              genre: action.payload.genre,
                              id: action.payload.id,
                              author: action.payload.author
                    }
        }
        default: return state
    }
}