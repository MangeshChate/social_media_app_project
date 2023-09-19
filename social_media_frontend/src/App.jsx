import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';


function App() {

  return (
    <Router>

        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/profile/:username" element={<Profile/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>

        </Routes>

    </Router>
  )
}

export default App
