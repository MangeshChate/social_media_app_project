import React, { useContext, useEffect, useState, } from 'react'
import "./rightbar.css"
import { Add, Remove, SettingsEthernet } from "@mui/icons-material"
import { Users } from "../../dummyData"
import Online from '../online/Online'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
function Rightbar({ user }) {

  const PF = import.meta.env.VITE_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.following.includes(user?._id));



  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`http://localhost:8800/api/users/friends/` + user._id);
        setFriends(friendList.data);

      } catch (error) {
        console.log(error)
      }
    }
    getFriends();
  }, [user])

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
          userId: currentUser._id
        });
        dispatch({ type: "UNFOLLOW", payload: user._id })
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, { userId: currentUser._id });
        dispatch({ type: "FOLLOW", payload: user._id })

      }
      setFollowed(!followed)
    } catch (error) {
      console.log(error)
    }
  }


  const HomeRightbar = () => {
    return (
      <div className=''>

        <div className="birthdayContainer ">
          <img src="https://cdn-icons-png.flaticon.com/512/6021/6021967.png" className='birthdayImg' alt="" />
          <span className="birthdayText"><b>Jugal Khandre</b> and <b>3 other friends</b> have a birth day today.</span>
        </div>
       
        <img src="https://www.levi.in/on/demandware.static/-/Sites-LeviIN-Library/en_IN/dw17b210a1/images/TileBannerpolo.jpg" className='rightbarAd' alt="ad" />
        
        <h4 className='rightbarTitle'>Online Friends</h4>
        <ul className="rightbarFriendList">
          {
            Users.map((u => (
              <Online key={u.id} user={u} />
            )))
          }

        </ul>
      </div>
    )
  }

  const ProfileRightbar = () => {
    return (
      <div className=''>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}


          </button>
        )}
        <h4 className='rightbarTitle'>user Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "marrid" : "-"}</span>
          </div>
        </div>
        <div className='eth-card eth shadow rounded-1 shadow-lg' >
          <div className="eth-wrapper ">
            <div className='d-flex justify-content-between align-items-center fw-bold font-monospace'>
              <img src="https://cutewallpaper.org/24/ethereum-logo-png/32-ethereum-logo-transparent-icon-logo-design.png" alt="" className='img-fluid ' width="40px" />
              <div> 
                
                  carrot card
              </div>
            </div>
            <div className='eth-profile  d-flex flex-column'>
              <span className='fw-bold font-monospace'>mangesh bhaskar chate</span>
              <span className='fw-bold font-monospace text-muted mt-2'>0x7E8b874gfjd843hr8</span>
            </div>

          </div>

        </div>
        <h4 className='rightbarTitle'>User Friends</h4>

        <div className="rightbarFollowings ">
          {
            friends.map((friend) => (
              <Link to={"/profile/" + friend.username} style={{ textDecoration: "none" }}>
                <div className="rightbarFollowing" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "white", fontSize: "800" }}>
                  <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "avatar.gif"} alt="" className="rightbarFollowingImg" />
                  <span className="rightbarFollowingName" >{friend.username}</span>
                </div>
              </Link>
            ))
          }


        </div>


      </div>
    )
  }
  return (
    <div className='rightBar'>
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
