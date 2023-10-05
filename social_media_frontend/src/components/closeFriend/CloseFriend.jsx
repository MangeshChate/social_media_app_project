import React from 'react'
import './closeFriend.css'
function CloseFriend({user}) {
    return (

        <li className="sidebarFriend text-light ">
            <img src={user.profilePicture} className='sidebarFriendImg' alt="" />
            <span className='sidebarFriendName'>{user.username}</span>
        </li>

    )
}

export default CloseFriend

