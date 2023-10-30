import React, { useContext } from 'react'
import "./topbar.css";
import { Search, Person, Chat, Notifications, Logout } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Button } from '@mui/material';
function Topbar() {

  const {user} = useContext(AuthContext);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;


  const handleLogOut = () =>{
    localStorage.removeItem('user');
    location.reload();
  }

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
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
        <img 
        crossOrigin='anonymous' 
          src={user && user.profilePicture ? PF + user.profilePicture : PF + "avatar.gif"}
          alt="profilepicture"
          className="topbarImg"
        />
        </Link>
        <Button variant="contained" className='d-flex justify-content-center align-align-items-center gap-1 fw-bold shadow-lg border-0 bg-opacity-10 bg-warning' onClick={ handleLogOut }>
          <span>sign out</span>
          <Logout sx={{fontSize:"1.2em"}}/>
        </Button>

      </div>

    </div>
  )
}

export default Topbar
