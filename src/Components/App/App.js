import './App.css';
import Home from "../Home/Home";
import Header from "../Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";

export const url = 'http://localhost:3001/'
// export const url = '/'

function App() {
  return (
    <div className="App">
        <Header/>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home/>}/>
                {/*<Route path='office' element/>*/}
            </Routes>
        </BrowserRouter>


    </div>
  );
}

export default App;
