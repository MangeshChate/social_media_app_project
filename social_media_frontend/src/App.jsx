import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/messagner/Messenger';
import PalmAi from './pages/PlamAi/PalmAi';
import Wallet from './pages/Wallet';


function App() {

  const { user } = useContext(AuthContext);

  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<>{user ? <Home /> : <Register />}</>} />
        <Route exact path="/login" element={<>{user ? <Navigate to="/" /> : <Login />}</>} />
        <Route exact path="/profile/:username" element={user ? <Profile /> : <Register />} />
        <Route exact path="/register" element={<>{user ? <Navigate to="/" /> : <Register />}</>} />

        <Route exact path="/messenger" element={<>{!user ? <Navigate to="/" /> : <Messenger />}</>} />
        <Route exact path="/RabbitAi" element={<>{!user ? <Navigate to="/" /> : <PalmAi />}</>} />
        <Route exact path="/wallet" element={<>{<Wallet/>}</>} />




      </Routes>

    </Router>
  )
}

export default App
