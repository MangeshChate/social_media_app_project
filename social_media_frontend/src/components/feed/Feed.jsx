import React, { useContext, useEffect, useState } from 'react'
import "./feed.css"
// import {Posts} from "../../dummyData"
import Share from '../share/Share'
import Post from '../posts/Post'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
        
function Feed({username , state}) {

  
  const [posts ,setPosts] = useState([]);
  const {user} = useContext(AuthContext)

  
 
  useEffect(()=>{
    const fetchPosts = async() =>{

      const res = username 
      ? await axios.get(`http://localhost:8800/api/posts/profile/${username}`)
      : await axios.get(`http://localhost:8800/api/posts/timeline/${user._id}`);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt)-new Date(p1.createdAt)
      }));
    }
    fetchPosts();
  },[username,user._id])

  return (
    <div className='feed '>
      <div className="feedWrapper">
        { (!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} state={state} />
        ))}

      </div>
    </div>
  )
}

export default Feed
