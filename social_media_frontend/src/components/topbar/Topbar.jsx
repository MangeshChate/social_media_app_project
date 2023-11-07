import React, { useContext } from 'react'
import "./topbar.css";
import { Search, Person, Chat, Notifications, Logout, ConnectWithoutContact } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';
import ConnectButton from '../../pages/ConnectButton';
function Topbar({saveState , path}) {

  const {user} = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  console.log(path)
 

  return (
    <div className='topbarContainer shadow rounded-0   blue-glassmorphism'>
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">RabbitChat</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar p-3 border-0 rounded-1  " style={{backgroundColor:"transparent"}}>
          <Search className='searchIcon text-light' />
          <input type="text" placeholder='search for friends, posts or video' className='searchInput text-light ms-3'style={{backgroundColor:"transparent"}} />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>

        </div>
        <div className="topbarIcons ">

        <ConnectButton saveState={saveState} path={path}/>

        </div>
        <Link to={`/profile/${user.username}`}>
        <img 
        crossOrigin='anonymous' 
          src={user && user.profilePicture ? PF + user.profilePicture : PF + "avatar.gif"}
          alt="profilepicture"
          className="topbarImg"
        />
        </Link>
       

      </div>

    </div>
  )
}

export default Topbar
