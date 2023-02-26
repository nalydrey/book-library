import store from "../store";

export const enterUser = (user) => {
    store.dispatch({type: 'ENTER_USER', payload: user})
}
export const exitUser = (user) => {
    store.dispatch({type: 'EXIT_USER', payload: user})
}