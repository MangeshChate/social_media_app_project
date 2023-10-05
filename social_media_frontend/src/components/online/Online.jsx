import React from 'react'
import "./online.css"
function Online({user}) {
    return (
        <li className="rightbarFriend text-light">
            <div className="rightbarProfileImgContainer">
                <img src={user.profilePicture} className='rightbarProfileImg' alt="" />
                <span className='rightbarOnline'></span>
            </div>
            <span className="rightbarUserName">{user.username}</span>
        </li>
    )
}

export default Online
