import store from "../store";

export const showHideLeftPanel = (bool) => {
    store.dispatch({type:'SHOW/HIDE_LEFT_PANEL',  payload: bool})
}