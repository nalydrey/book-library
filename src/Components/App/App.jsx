import './App.css';
import Home from "../Home/Home";
import Header from "../Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import RegisterForm from "../UI/RegisterForm";
import Office from "../Office/Office";
import {useEffect, useState} from "react";
import {enterUser} from "../../store/action_creators/actionCreatorCurrentUser";
import axios from "axios";
import {showHideLeftPanel} from "../../store/action_creators/actionCreatorLeftControl";
import BookForm from "../UI/BookForm";

// export const url = 'http://localhost:3001/'
export const url = '/'

function App() {


    const [refreshBooks, setRefreshBooks] = useState(false)
    useEffect(()=>{
        const currentUserId = localStorage.getItem('currentAuthor')
        currentUserId && axios.get(url+`authors/${currentUserId}`).then(resp => {
            enterUser(resp.data)
        })
    },[])

    useEffect(()=>{
        document.addEventListener('click', closeMenu)
        return () => {
            document.removeEventListener('click', closeMenu)
        }
    },[])

    const closeMenu = () => {
        showHideLeftPanel(false)
    }

  return (
    <div className="App">
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home refreshBooks={refreshBooks}/>}/>
                <Route path='office' element={<Office refreshBooks={refreshBooks}/>}/>
            </Routes>
            <RegisterForm/>
            <BookForm addHandler={()=>setRefreshBooks(!refreshBooks)}/>
        </BrowserRouter>


    </div>
  );
}

export default App;
