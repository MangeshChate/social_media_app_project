import React, { useState } from 'react'
import "./post.css";
import { Users } from "../../dummyData"
import { MoreVert } from "@mui/icons-material";
function Post({ post }) {

    const [like , setLike] = useState(post.likes);
    const [isLiked , setIsLiked] = useState(false);

    const likeHandler = () =>{
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }
    return (
        <div className='post' >
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img src={Users.filter((u)=>u.id===post?.userId)[0].profilePicture} alt="" className='postProfileImg' />
                        {
                            Users.filter((u) => u.id === post.userId).map((user) => (
                                <span key={user.id} className='postUsername'>
                                    {user.username}
                                </span>
                            ))
                        }

                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>

                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={post.photo} alt="" className='postImg' />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src="https://www.freeiconspng.com/thumbs/heart-png/heart-png-15.png" alt="love" className='likeIcon' onClick={likeHandler} />
                        <img src="https://pngimg.com/d/like_PNG14.png" className='likeIcon' alt="like" onClick={likeHandler}/>
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
