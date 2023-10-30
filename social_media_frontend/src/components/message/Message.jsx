import React from 'react'
import './message.css'
import {format} from "timeago.js"
function Message({message, own}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="https://a10.gaanacdn.com/gn_img/artists/6Zxb2r7b9w/Zxb2paJ39w/size_xl_1631802583.webp" alt="" className='messageImg' />
        <p className='messageText'>{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    
    </div>
  )
}

export default Message
