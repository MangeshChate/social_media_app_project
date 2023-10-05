import React, { useContext, useEffect, useState } from 'react'
import "./post.css";
import { Link } from 'react-router-dom';
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { AuthContext } from '../../context/AuthContext';
function Post({ post }) {

    const {user:currentUser}=  useContext(AuthContext)
    const PF = import.meta.env.VITE_PUBLIC_FOLDER;
    

    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState([]);

    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id.$oid ,post.likes])
    
    const likeHandler = () => {

        try {
            axios.put(`http://localhost:8800/api/posts/${post._id}/like` ,{userId:currentUser._id})
        } catch (error) {
            
        }

        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        const fetchUsers = async () => {

            const res = await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
            setUser(res.data);

            setUser(res.data);
        }
        fetchUsers();
    }, [])

    return (
        <div className='post white-glassmorphism' >
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img crossOrigin='anonymous'  src={user.profilePicture ? PF+user.profilePicture : PF + "avatar.gif"}

                                alt="userimg"
                                className='postProfileImg' />
                        </Link>
                        {

                            <span key={user._id} className='postUsername'>
                                {user.username}
                            </span>

                        }

                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>

                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img crossOrigin='anonymous' src={PF + post.img} alt="" className='postImg' />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img  src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png" alt="love" className='likeIcon' onClick={likeHandler} />
                        <img  src="https://pngimg.com/d/like_PNG14.png" className='likeIcon' alt="like" onClick={likeHandler} />
                        <span className="likeCounter">{like} people like</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comments} comments</span>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Post
