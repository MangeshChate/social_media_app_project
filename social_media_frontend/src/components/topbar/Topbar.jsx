import React from 'react'
import "./topbar.css";
import {Search ,Person, Chat, Notifications} from "@mui/icons-material"
function Topbar() {
  return (
    <div className='topbarContainer'>
      <div className="topbarLeft">
        <span className="logo">RabbitChat</span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
            <Search className='searchIcon'/>
            <input type="text" placeholder='search for friends, posts or video' className='searchInput'/>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
            <span className="topbarLink">Homepage</span>
            <span className="topbarLink">Timeline</span>

        </div>
        <div className="topbarIcons">
            <div className="topbarIconItem">
                <Person/>
                <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
                <Chat/>
                <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
                <Notifications/>
                <span className="topbarIconBadge">1</span>
            </div>
        </div>
        <img src="https://media.licdn.com/dms/image/D5603AQEMaxAUdeWjUA/profile-displayphoto-shrink_800_800/0/1692416483158?e=2147483647&v=beta&t=5a-wzTBakwDfiOW1WaxpnWO4NeayH6nfUbswzT7eI0A" alt="profilepicture" className='topbarImg' />
      </div>

    </div>
  )
}

export default Topbar
