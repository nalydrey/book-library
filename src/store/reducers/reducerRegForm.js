const initState = {
    firstName: '',
    lastName: '',
    fathersName: '',
    born: '',
    isOpen: false,
    isValid: false,
    isEdit: false
}

export const reducerRegForm = (state=initState, action) => {
    switch(action.type){

        case 'FILL_FIELD': {
            return {...state, [action.name] : action.payload}
        }
        case 'CHECK_REG_FORM':{
            const newStatus = !!(state.firstName && state.lastName && state.born)
            return {...state, isValid: newStatus}
        }
        case 'SHOW/HIDE_REG_FORM': return {...state, isOpen: action.payload, isEdit: action.mode }
        case 'CHANGE_REG_MODE': return {...state, isEdit: action.payload}
        case 'CLEAR_REG_FORM': return {...initState}
        default: return state;
    }
}