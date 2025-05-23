import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import { useContext, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import Messenger from './pages/messagner/Messenger';
import PalmAi from './pages/PlamAi/PalmAi';
import Wallet from './pages/Wallet';
import Furryfeeds from './pages/furreyFeeds/Furryfeeds';
import RabbiTube from './pages/Rabbitube/RabbiTube';
import VideoWindow from './pages/Rabbitube/VideoWindow';
import Metaverse from './pages/metaverse/Metaverse';


function App() {

  const { user } = useContext(AuthContext);

  const [ state , setState] = useState({
    web3:null,
    contract:null
  });

  
  const saveState = (state) => {
    setState(state);
  }
  

  
  return (
    <Router>

      <Routes>
        <Route exact path="/" element={<>{user ? <Home saveState={saveState}  state={state}/> : <Register />}</>} />
        <Route exact path="/login" element={<>{user ? <Navigate to="/" /> : <Login />}</>} />
        <Route exact path="/profile/:username" element={user ? <Profile  state={state}  saveState={saveState}/> : <Register />} />
        <Route exact path="/register" element={<>{user ? <Navigate to="/" /> : <Register />}</>} />

        <Route exact path="/messenger" element={<>{!user ? <Navigate to="/" /> : <Messenger />}</>} />
        <Route exact path="/RabbitAi" element={<>{!user ? <Navigate to="/" /> : <PalmAi state={state} saveState={saveState}/>}</>} />
        <Route exact path="/furryfeeds" element={<>{!user ? <Navigate to="/" /> :  <Furryfeeds state={state} saveState={saveState}/>}</>} />

        <Route exact path="/rabitube" element={<>{!user ? <Navigate to="/" /> :  <RabbiTube state={state} saveState={saveState}/>}</>} />

        <Route exact path="/metaverse" element={<>{!user ? <Navigate to="/" /> :  <Metaverse state={state} saveState={saveState}/>}</>} />

        <Route exact path="/rabitube/videowindow" element={<>{!user ? <Navigate to="/" /> :  <VideoWindow state={state} saveState={saveState}/>}</>} />

        <Route exact path="/wallet" element={<>{<Wallet saveState={saveState}  state={state}/>}</>} />




      </Routes>

    </Router>
  )
}

export default App
