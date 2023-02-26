import {combineReducers, createStore} from 'redux'
import {reducerRegForm} from "./reducers/reducerRegForm";
import {reducerCurrentUser} from "./reducers/reducerCurrentUser";
import {reducerLeftControl} from "./reducers/reducerLeftControl";
import {reducerBookForm} from "./reducers/reducerBookForm";



const rootReducer = combineReducers({
    regForm: reducerRegForm,
    bookForm: reducerBookForm,
    currentUser: reducerCurrentUser,
    leftPanel: reducerLeftControl
})

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store