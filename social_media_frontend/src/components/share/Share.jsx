import React, { useContext, useRef, useState } from 'react'
import "./share.css";
import { AddBox, Cancel, EmojiEmotions, EmojiEmotionsOutlined, Label, PermMedia, PlayArrowTwoTone, PostAdd, Room, ShareOutlined } from "@mui/icons-material";
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
function Share() {
  const PF = import.meta.env.VITE_PUBLIC_FOLDER;


  const { user } = useContext(AuthContext)
  const desc = useRef();
  const [file,setFile]  = useState(null);

  const submitHandler = async(e) =>{
    e.preventDefault();
    const newPost = {
      userId:user._id,
      desc:desc.current.value,

    }
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      console.log(fileName + file)
      data.append("file" ,file ,fileName)
      // data.append("name" ,fileName)
      
      
      
      newPost.img = fileName;
      
      try {
        await axios.post('http://localhost:8800/api/upload',data)
      } catch (error) {
        console.log(error)
      }
    }

    try{
       await  axios.post("http://localhost:8800/api/posts",newPost);
       window.location.reload()
    }catch(err){
        console.log((err))
    }
  }

  return (
    <div className='share white-glassmorphism'>
      <div className="shareWrapper">
        <div className="shareTop">
          <img crossOrigin='anonymous'  src={user.profilePicture ? PF + user.profilePicture : PF + "avatar.gif"} className='shareProfileImg' alt="" />
          <input type="text" placeholder={"What's in your mind " + user.username + " ?"} className='shareInput p-3 text-light ms-3 ' ref={desc} />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} className='shareImg' alt="" />
            <Cancel className='shareCancleImg' onClick={()=>setFile(null)}/>
          </div>
        )}

        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor='file' className="shareOption">
              <PermMedia className='shareIcon' htmlColor='tomato' />
              <span className='shareOptionText'>Photo/Video</span>
              <input style={{display:"none"}} type="file" id="file" accept='.gif ,.png ,.jpeg ,.jpg' onChange={(e)=>setFile(e.target.files[0])}/>
            </label>
            <div className="shareOption">
              <Label className='shareIcon' htmlColor='blue' />
              <span className='shareOptionText'>Tag</span>
            </div>
            <div className="shareOption">
              <Room className='shareIcon' htmlColor='green' />
              <span className='shareOptionText'>Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions className='shareIcon' htmlColor='orange' />
              <span className='shareOptionText'>Feelings</span>
            </div>
          </div>

          <button className="shareButton" type={'submit'}>Share</button>
        </form>
      </div>
    </div>
  )
}

export default Share
