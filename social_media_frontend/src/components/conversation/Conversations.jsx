import React, { useEffect, useState } from 'react'
import './conversation.css'
import axios from 'axios';
function Conversations({ conversation, currentUser }) {
  const [user, setUser] = useState([]);
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  useEffect(() => {
    const friendId = conversation.members.find(m => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios("http://localhost:8800/api/users?userId=" + friendId);
        setUser(res.data);

      } catch (error) {
        console.log(error)

      }

    }
    getUser();
  }, [currentUser , conversation])

  return (
    <div className='conversations text-light'>
      <img src={user.profilePicture ? user.profilePicture : PF+"avatar.gif"} alt="" className="conversationImg" />
      <span className="conversationName">{user.username}</span>
    </div>
  )
}

export default Conversations
