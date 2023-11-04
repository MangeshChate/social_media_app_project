import React from 'react'
import avatar from "../../../assets/avatar.gif"
import { Link } from 'react-router-dom'
function VideoCard({account , title, description , videoUrl ,thumbnail ,  timestamp}) {

    const clickHandle = () =>{
        localStorage.setItem("account", account);
        localStorage.setItem("title", title);
        localStorage.setItem("description", description);
        localStorage.setItem("videoUrl", videoUrl);
        localStorage.setItem("thumbnail", thumbnail);
        localStorage.setItem("timestamp", timestamp);

    }

    return (
        <div className='card  blue-glassmorphism text-light ms-1 me-1' style={{ width: "440px", height: "320px" }}>
            <div className="card-image">
                <Link to="/rabitube/videowindow" style={{ cursor: "pointer" }}>
                    <img src={thumbnail} alt="" className='img-fluid object-fit-cover p-2 rounded-4' style={{ width: "100%", height: "250px" }} onClick={clickHandle}/>
                </Link>
                <div className='m-2 ms-3 d-flex gap-4 align-items-start' >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={avatar} style={{ height: "44px", width: "44px", borderRadius: "50%", border: "1px solid white" }} />

                    </div>

                    <span>
                        <h5 className='fw-bold '>{title}</h5>
                        <span className='text-secondary  ' style={{ fontSize: "0.9rem" }}>{account}</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default VideoCard
