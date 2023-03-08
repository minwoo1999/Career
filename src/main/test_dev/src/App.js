import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import "./reset.css"
import Main from './js/Main.js';
import Login from './js/Auth/Login.js'
import Join from './js/Auth/Join';
import MyPage from './js/MyPage';


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Main/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/join' element={<Join />}/>
        <Route path='/myPage' element={<MyPage />}/>

      </Routes>
    </BrowserRouter>
  );
}




export default App;