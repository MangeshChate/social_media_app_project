import React, { useEffect, useState } from 'react'
import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
import axios from 'axios';
import { useParams } from 'react-router'
function Profile() {
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;

  
    const [user, setUser] = useState([]);
    const username = useParams().username
    
    useEffect(() => {
        const fetchUsers = async () => {

            const res = await axios.get(`http://localhost:8800/api/users?username=${username}`);
            setUser(res.data);


        }
        fetchUsers();
    }, [username])
    return (
        <div>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">

                        <img  crossOrigin='anonymous'  src={user.coverPicture ? PF +user.coverPicture : PF+"coverImg.gif"} className='profileCoverImg' alt="" />
                        <img crossOrigin='anonymous'  src={user.profilePicture ? PF+ user.profilePicture : PF+"avatar.gif"} className='profileUserImg' alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username}/>
                        <Rightbar user={user}/>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile
