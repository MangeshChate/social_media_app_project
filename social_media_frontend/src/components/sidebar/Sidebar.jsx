import React from 'react'
import "./sidebar.css"
import { Bookmark, Chat, Event, Group, HailTwoTone, QuestionMarkRounded, RssFeed, School, VideoCallRounded, Work, WorkHistory } from "@mui/icons-material";
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from '../../dummyData'
import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <div className='sideBar gradient-bg-transactions '>
            <div className="sidebarWrapper">
                <ul className='sidebarList'>
                    <li className="sidebarListItem">
                        <RssFeed className='sidebarIcon' />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <Link to="/messenger" className="sidebarListItem text-decoration-none text-light">
                        <Chat className='sidebarIcon' />
                        <span className="sidebarListItemText">Chats</span>
                    </Link>
                    <li className="sidebarListItem">
                        <VideoCallRounded className='sidebarIcon' />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className='sidebarIcon' />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className='sidebarIcon' />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <QuestionMarkRounded className='sidebarIcon' />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkHistory className='sidebarIcon' />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className='sidebarIcon' />
                        <span className="sidebarListItemText">Events</span>
                    </li>



                </ul>
                <hr />
                
                    <Link to="/rabbitai" className="sidebarListItem text-decoration-none text-light btn  btn-outline-info mt-4 rounded-3 shadow font-monospace">

                        <img src="https://stickerswiki.ams3.cdn.digitaloceanspaces.com/zoobapack/6168298.512.webp" className='sidebarIconImg' alt="" />
                        <span className="sidebarListItemText fw-bold ">Talk with Rabbit AI</span>
                    </Link>

              

                
                <button className="sidebarButton">Show More</button>
                {/* <hr className='sidebarHr' />
                <ul className="sidebarFriendList">
                    {Users.map((u) => (

                        <CloseFriend key={u.id} user={u} />
                    ))}

                </ul> */}
            </div>
        </div>
    )
}

export default Sidebar
Sidebar