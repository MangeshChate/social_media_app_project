import React, { useEffect, useState } from 'react'
import './chatOnline.css'
import axios from 'axios';
import { ArrowForwardIosTwoTone } from '@mui/icons-material';
function ChatOnline({onlineUsers , currentId , setCurrentChat}) {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [friends , setFriends] = useState([]);
  const [onlineFriends , setOnlineFriends] = useState([]);
  useEffect(()=>{
    const getFriends = async ()=>{
      const res = await axios.get("http://localhost:8800/api/users/friends/" + currentId);
      setFriends(res.data);
    }
    getFriends();
  },[currentId])

  useEffect(()=>{
    setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)))
  },[onlineUsers , friends])
  
const handleClick = async(user) =>{
  try {
    const res = await axios.get(`http://localhost:8800/api/conversations/find/${currentId}/${user._id}`)
    setCurrentChat(res.data)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div className='chatOnline'>
{onlineFriends.map((o)=>(

        <div className="chatOnlineFriend" onClick={()=>{handleClick(o)}}>
            <div className="chatOnlineImgContainer">
                <img src={o?.profilePicture ? PF+o.profilePicture : PF+"avatar.gif"} className='chatOnlineImg' alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
            <div className="chatOnlineName">{o.username}</div>
        </div>
))}

    </div>
  )
}

export default ChatOnline
