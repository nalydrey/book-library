


export const reducerCurrentUser = (state=null, action) => {
    switch(action.type){
        case 'ENTER_USER': return {...action.payload}
        case 'EXIT_USER': return null
        default: return state
    }
}