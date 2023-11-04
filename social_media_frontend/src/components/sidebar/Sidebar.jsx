import React from 'react'
import "./sidebar.css"
import { Bookmark, Chat, Event, Group, HailTwoTone, Logout, QuestionMarkRounded, RssFeed, School, VideoCallRounded, Work, WorkHistory } from "@mui/icons-material";
import CloseFriend from '../closeFriend/CloseFriend';
import { Users } from '../../dummyData'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
function Sidebar() {
    const handleLogOut = () => {
        localStorage.removeItem('user');
        location.reload();
    }

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
                        <WorkHistory className='sidebarIcon' />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className='sidebarIcon' />
                        <span className="sidebarListItemText">Events</span>
                    </li>



                </ul>
                <hr />
                <Link to="/rabitube" className="m-3  text-decoration-none text-light btn  btn-outline-info  rounded-3 shadow font-monospace d-flex align-items-center">

                    <img src="https://cdn-icons-png.flaticon.com/512/802/802338.png" alt="" className='img-fluid object-fit-cover' style={{ height: "44px" }} />
                    <span span className="sidebarListItemText fw-bold ms-3" >Web 3.0 RabiTube</span >
                </Link>

                <Link to="/furryfeeds" className="m-3  text-decoration-none text-light btn  btn-outline-info  rounded-3 shadow font-monospace d-flex align-items-center">

                    <img src="https://cdn-icons-png.flaticon.com/512/802/802338.png" alt="" className='img-fluid object-fit-cover' style={{ height: "44px" }} />
                    <span span className="sidebarListItemText fw-bold ms-3" >Web 3.0 FurryFeeds</span >
                </Link>


                <Link to="/rabbitai" className="m-3  text-decoration-none text-light btn  btn-outline-info  rounded-3 shadow font-monospace d-flex align-items-center">

                    <img src="https://stickerswiki.ams3.cdn.digitaloceanspaces.com/zoobapack/6168298.512.webp" className='sidebarIconImg' alt="" />
                    <span className="sidebarListItemText fw-bold ">Talk with Rabbit AI</span>
                </Link>


                <hr />

                <Button variant="contained" className='mt-5 bg-danger shadow  d-flex justify-content-center align-align-items-center gap-3   shadow-lg  bg-opacity-25 ' onClick={handleLogOut}>
                    <span>Logout</span>
                    <Logout sx={{ fontSize: "1.2em" }} />
                </Button>
            </div>
        </div>
    )
}

export default Sidebar

