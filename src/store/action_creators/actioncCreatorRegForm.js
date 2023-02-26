import store from "../store";

export const fillRegForm = (val, field) => {
    store.dispatch({type: 'FILL_FIELD', payload: val, name: field})
}
export const showHideRegForm = (val, mode) => {
    store.dispatch({type: 'SHOW/HIDE_REG_FORM', payload: val, mode})
}
export const changeModeRegForm = (val) => {
    store.dispatch({type: 'CHANGE_REG_MODE', payload: val})
}
export const checkRegForm = (val) => {
    store.dispatch({type: 'CHECK_REG_FORM', payload: val})
}
export const clearRegForm = (val) => {
    store.dispatch({type: 'CLEAR_REG_FORM', payload: val})
}