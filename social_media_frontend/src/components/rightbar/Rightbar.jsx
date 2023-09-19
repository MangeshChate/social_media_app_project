import React from 'react'
import "./rightbar.css"
import { } from "@mui/icons-material"
import { Users } from "../../dummyData"
import Online from '../online/Online'
function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src="https://cdn-icons-png.flaticon.com/512/6021/6021967.png" className='birthdayImg' alt="" />
          <span className="birthdayText"><b>Pola Foster</b> and <b>3 other friends</b> have a birth day today.</span>
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
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
        <h4 className='rightbarTitle'>user Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">Nanded</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Mumbai</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Single</span>
          </div>
        </div>
        <h4 className='rightbarTitle'>User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src="https://avatars.mds.yandex.net/i?id=12015ed8b38df2fe650836e8530b72db1fc9c357-6392895-images-thumbs&n=13" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Tony Chopper</span>
          </div>
          <div className="rightbarFollowing">
            <img src="https://avatars.mds.yandex.net/i?id=12015ed8b38df2fe650836e8530b72db1fc9c357-6392895-images-thumbs&n=13" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Tony Chopper</span>
          </div>
          <div className="rightbarFollowing">
            <img src="https://avatars.mds.yandex.net/i?id=12015ed8b38df2fe650836e8530b72db1fc9c357-6392895-images-thumbs&n=13" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Tony Chopper</span>
          </div>
          <div className="rightbarFollowing">
            <img src="https://avatars.mds.yandex.net/i?id=12015ed8b38df2fe650836e8530b72db1fc9c357-6392895-images-thumbs&n=13" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Tony Chopper</span>
          </div>
          <div className="rightbarFollowing">
            <img src="https://avatars.mds.yandex.net/i?id=12015ed8b38df2fe650836e8530b72db1fc9c357-6392895-images-thumbs&n=13" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Tony Chopper</span>
          </div>
          <div className="rightbarFollowing">
            <img src="https://avatars.mds.yandex.net/i?id=12015ed8b38df2fe650836e8530b72db1fc9c357-6392895-images-thumbs&n=13" alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Tony Chopper</span>
          </div>
         
        </div>
      </>
    )
  }
  return (
    <div className='rightBar'>
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar/> : <HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar
