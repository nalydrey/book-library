
export const reducerLeftControl = (state=false, action) => {
    switch(action.type){
        case 'SHOW/HIDE_LEFT_PANEL': return {...state, isOpen: action.payload}
        default: return state
    }
}