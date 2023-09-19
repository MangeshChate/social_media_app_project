import React from 'react'
import './profile.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Feed from '../../components/feed/Feed'
function Profile() {
    return (
        <div>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">

                        <img src="https://www.drcommodore.it/wp-content/uploads/2023/05/trasferimento-2023-05-20T173444.727-1-1-1024x576.jpg" className='profileCoverImg' alt="" />
                        <img src="https://marcorei7.files.wordpress.com/2021/05/ee72b0ca17cd6185e03ed809ba766698.jpeg?w=500" className='profileUserImg' alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>Mangesh Chate</h4>
                            <span className="profileInfoDesc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus aut maxime consectetur.</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed />
                        <Rightbar profile/>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Profile
