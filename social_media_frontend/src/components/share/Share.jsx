import React from 'react'
import "./share.css";
import { EmojiEmotions, EmojiEmotionsOutlined, Label, PermMedia, Room } from "@mui/icons-material";
function Share() {
  return (
    <div className='share'>
      <div className="shareWrapper">
        <div className="shareTop">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWBSZEZP7imKmWy55Lk1GUiV6vCGXFj4i5Cg&usqp=CAU" className='shareProfileImg' alt="" />
            <input type="text" placeholder='Whats in your mind' className='shareInput' />
        </div>
        <hr className="shareHr" />

        <div className="shareBottom">
            <div className="shareOptions">
                <div className="shareOption">
                    <PermMedia className='shareIcon' htmlColor='tomato'/>
                    <span className='shareOptionText'>Photo/Video</span>
                </div>
                <div className="shareOption">
                    <Label className='shareIcon' htmlColor='blue'/>
                    <span className='shareOptionText'>Tag</span>
                </div>
                <div className="shareOption">
                    <Room className='shareIcon'htmlColor='green'/>
                    <span className='shareOptionText'>Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions className='shareIcon'htmlColor='orange'/>
                    <span className='shareOptionText'>Feelings</span>
                </div>
            </div>
            <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  )
}

export default Share
